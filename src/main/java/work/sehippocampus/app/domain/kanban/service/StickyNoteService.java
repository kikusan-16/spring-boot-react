package work.sehippocampus.app.domain.kanban.service;

import work.sehippocampus.app.domain.kanban.entity.StickyNoteEntity;
import work.sehippocampus.app.domain.kanban.form.StickyNoteForm;

import java.util.List;

public interface StickyNoteService {

    List<StickyNoteEntity> getStickyNotes();

    StickyNoteEntity upsertStickyNote(StickyNoteForm form);

}
