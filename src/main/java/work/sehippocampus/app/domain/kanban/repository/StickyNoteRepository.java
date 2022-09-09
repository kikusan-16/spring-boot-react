package work.sehippocampus.app.domain.kanban.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import work.sehippocampus.app.domain.kanban.entity.StickyNoteEntity;

@Repository
public interface StickyNoteRepository extends JpaRepository<StickyNoteEntity, String> {
}
