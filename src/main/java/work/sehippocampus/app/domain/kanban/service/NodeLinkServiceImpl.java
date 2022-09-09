package work.sehippocampus.app.domain.kanban.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import work.sehippocampus.app.domain.kanban.entity.NodeLinkEntity;
import work.sehippocampus.app.domain.kanban.form.NodeLinkForm;
import work.sehippocampus.app.domain.kanban.repository.NodeLinkRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NodeLinkServiceImpl implements NodeLinkService {
    private final ModelMapper modelMapper;
    private final NodeLinkRepository nodeLinkRepository;

    public List<NodeLinkEntity> getNodes() {
        return nodeLinkRepository.findAll();
    }

    @Override
    public List<NodeLinkEntity> upsertNodes(List<NodeLinkForm> forms) {
        List<NodeLinkEntity> entities = modelMapper.map(forms,
                // ListのマッピングにTypeToken無名クラスを使用
                new TypeToken<List<NodeLinkEntity>>() { }.getType()
                );
        return nodeLinkRepository.saveAll(entities);
    }
}
