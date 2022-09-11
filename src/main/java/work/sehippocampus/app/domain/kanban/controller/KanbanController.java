package work.sehippocampus.app.domain.kanban.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import work.sehippocampus.app.domain.kanban.entity.KanbanEntity;
import work.sehippocampus.app.domain.kanban.form.KanbanForm;
import work.sehippocampus.app.domain.kanban.service.KanbanService;

import java.util.List;

@RestController
@RequestMapping("/api/kanban")
@RequiredArgsConstructor
public class KanbanController {
    private final KanbanService kanbanService;

    @GetMapping
    public List<KanbanEntity> getAll() {
        return kanbanService.getKanban();
    }

    @PostMapping
    public KanbanEntity upsert(@RequestBody KanbanForm form) {
        return kanbanService.upsertKanban(form);
    }
}
