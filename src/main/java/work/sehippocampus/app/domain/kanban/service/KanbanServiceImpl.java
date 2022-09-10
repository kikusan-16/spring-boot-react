package work.sehippocampus.app.domain.kanban.service;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.sehippocampus.app.domain.kanban.entity.KanbanEntity;
import work.sehippocampus.app.domain.kanban.form.KanbanForm;
import work.sehippocampus.app.domain.kanban.repository.KanbanRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KanbanServiceImpl implements KanbanService {
    private final ModelMapper modelMapper;
    private final KanbanRepository kanbanRepository;

    @Override
    public List<KanbanEntity> getKanban() {
        return kanbanRepository.findAll();
    }

    @Transactional
    @Override
    public KanbanEntity upsertKanban(KanbanForm form) {
        KanbanEntity entity = modelMapper.map(form, KanbanEntity.class);
        return kanbanRepository.save(entity);
    }
}
