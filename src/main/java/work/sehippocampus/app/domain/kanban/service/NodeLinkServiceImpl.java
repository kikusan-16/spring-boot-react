package work.sehippocampus.app.domain.kanban.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.sehippocampus.app.domain.kanban.entity.NodeLinkEntity;
import work.sehippocampus.app.domain.kanban.form.NodeLinkForm;
import work.sehippocampus.app.domain.kanban.repository.NodeLinkRepository;
import work.sehippocampus.app.exception.AppError;
import work.sehippocampus.app.exception.AppException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NodeLinkServiceImpl implements NodeLinkService {
    private final ModelMapper modelMapper;
    private final NodeLinkRepository nodeLinkRepository;

    @Override
    public List<NodeLinkEntity> getNodes() {
        return nodeLinkRepository.findAll();
    }

    @Override
    public NodeLinkEntity getNodeById(String id) {
        return nodeLinkRepository.findById(id).orElseThrow(
                () -> new AppException(AppError.NODE_NOTE_NOT_FOUND));
    }

    @Override
    public NodeLinkEntity getNodeByNext(String next) {
        return nodeLinkRepository.findByNext(next).orElseThrow(
                () -> new AppException(AppError.NODE_NOTE_NOT_FOUND));
    }

    @Transactional
    @Override
    public NodeLinkEntity upsertNode(NodeLinkForm form) {
        NodeLinkEntity entity = modelMapper.map(form, NodeLinkEntity.class);
        return nodeLinkRepository.save(entity);
    }

    @Transactional
    @Override
    public List<NodeLinkEntity> upsertNodes(List<NodeLinkForm> forms) {
        List<NodeLinkEntity> entities = modelMapper.map(forms,
                // ListのマッピングにTypeToken無名クラスを使用
                new TypeToken<List<NodeLinkEntity>>() { }.getType()
                );
        return nodeLinkRepository.saveAll(entities);
    }

    @Transactional
    @Override
    public void deleteNode(String id) {
        NodeLinkEntity entity = nodeLinkRepository.findById(id).orElseThrow(
                () -> new AppException(AppError.NODE_NOTE_NOT_FOUND));
        nodeLinkRepository.delete(entity);
    }
}
