package work.sehippocampus.app.domain.kanban.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import work.sehippocampus.app.domain.kanban.entity.StickyNoteEntity;
import work.sehippocampus.app.domain.kanban.form.StickyNoteForm;
import work.sehippocampus.app.domain.kanban.service.StickyNoteService;

import java.util.List;

@RestController
@RequestMapping("/api/stickynotes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StickyNoteController {

    private final StickyNoteService stickyNoteService;

    @GetMapping("/")
    public List<StickyNoteEntity> getAll() {
        return stickyNoteService.getStickyNotes();
    }

    @PostMapping("/")
    public StickyNoteEntity upsert(StickyNoteForm form) {
        return stickyNoteService.upsertStickyNote(form);
    }
}
