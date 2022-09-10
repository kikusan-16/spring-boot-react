package work.sehippocampus.app.domain.kanban.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.sehippocampus.app.domain.kanban.entity.NodeLinkEntity;
import work.sehippocampus.app.domain.kanban.entity.StickyNoteEntity;
import work.sehippocampus.app.domain.kanban.form.NodeLinkForm;
import work.sehippocampus.app.domain.kanban.form.StickyNoteForm;
import work.sehippocampus.app.domain.kanban.repository.StickyNoteRepository;
import work.sehippocampus.app.exception.AppError;
import work.sehippocampus.app.exception.AppException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StickyNoteServiceImpl implements StickyNoteService {
    private final ModelMapper modelMapper;
    private final StickyNoteRepository stickyNoteRepository;
    private final NodeLinkService nodeLinkService;

    @Override
    public List<StickyNoteEntity> getStickyNotes() {
        return stickyNoteRepository.findAll();
    }

    @Transactional
    @Override
    public StickyNoteEntity upsertStickyNote(StickyNoteForm form) {
        if (form != null) {
            StickyNoteEntity entity = modelMapper.map(form, StickyNoteEntity.class);
            return stickyNoteRepository.save(entity);
        }
        return stickyNoteRepository.save(new StickyNoteEntity());
    }

    @Transactional
    @Override
    public void deleteStickyNote(String id) {
        StickyNoteEntity stickyNoteEntity = stickyNoteRepository.findById(id).orElseThrow(
                () -> new AppException(AppError.STICKY_NOTE_NOT_FOUND));
        stickyNoteRepository.delete(stickyNoteEntity);

        NodeLinkEntity parentNode = nodeLinkService.getNodeByNext(id);
        NodeLinkEntity deletingNode = nodeLinkService.getNodeById(id);
        nodeLinkService.upsertNode(new NodeLinkForm(parentNode.getId(), deletingNode.getNext()));
        nodeLinkService.deleteNode(deletingNode.getId());

    }

}
