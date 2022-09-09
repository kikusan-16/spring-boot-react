package work.sehippocampus.app.domain.kanban.service;

import work.sehippocampus.app.domain.kanban.entity.KanbanEntity;
import work.sehippocampus.app.domain.kanban.form.KanbanForm;

import java.util.List;

public interface KanbanService {

    List<KanbanEntity> getKanban();

    KanbanEntity upsertKanban(KanbanForm form);
}
