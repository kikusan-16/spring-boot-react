package work.sehippocampus.app.domain.kanban.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import work.sehippocampus.app.domain.kanban.entity.StickyNoteEntity;
import work.sehippocampus.app.domain.kanban.form.StickyNoteForm;
import work.sehippocampus.app.domain.kanban.repository.StickyNoteRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StickyNoteServiceImpl implements StickyNoteService {
    private final ModelMapper modelMapper;
    private final StickyNoteRepository stickyNoteRepository;

    public List<StickyNoteEntity> getStickyNotes() {
        return stickyNoteRepository.findAll();
    }

    public StickyNoteEntity upsertStickyNote(StickyNoteForm form) {
        StickyNoteEntity entity = modelMapper.map(form, StickyNoteEntity.class);
        return stickyNoteRepository.save(entity);
    }
}
