package work.sehippocampus.app.common;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import work.sehippocampus.app.domain.kanban.entity.KanbanEntity;
import work.sehippocampus.app.domain.kanban.entity.NodeLinkEntity;
import work.sehippocampus.app.domain.kanban.entity.StickyNoteEntity;
import work.sehippocampus.app.domain.kanban.repository.KanbanRepository;
import work.sehippocampus.app.domain.kanban.repository.NodeLinkRepository;
import work.sehippocampus.app.domain.kanban.repository.StickyNoteRepository;
import work.sehippocampus.app.domain.user.entity.UserEntity;
import work.sehippocampus.app.domain.user.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseLoader implements CommandLineRunner {

    private final KanbanRepository kanbanRepository;
    private final StickyNoteRepository stickyNoteRepository;
    private final NodeLinkRepository nodeLinkRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void run(String... strings) throws Exception {

        List<KanbanEntity> kanbans = Arrays.asList(
                new KanbanEntity(null, "TODO", 1, "kanban/todo"),
                new KanbanEntity(null, "DOING", 1, "kanban/doing"),
                new KanbanEntity(null, "DONE", 1, "kanban/done"));
        this.kanbanRepository.saveAll(kanbans);

        List<StickyNoteEntity> stickyNotes = Arrays.asList(
                new StickyNoteEntity(null, "st1"),
                new StickyNoteEntity(null, "st2"),
                new StickyNoteEntity(null, "st3"),
                new StickyNoteEntity(null, "st4"),
                new StickyNoteEntity(null, "st5"),
                new StickyNoteEntity(null, "st6"));
        this.stickyNoteRepository.saveAll(stickyNotes);

        List<NodeLinkEntity> nodes = Arrays.asList(
                new NodeLinkEntity(kanbans.get(0).getId(), stickyNotes.get(0).getId()),
                new NodeLinkEntity(stickyNotes.get(0).getId(), stickyNotes.get(1).getId()),
                new NodeLinkEntity(stickyNotes.get(1).getId(), null),
                new NodeLinkEntity(kanbans.get(1).getId(), stickyNotes.get(2).getId()),
                new NodeLinkEntity(stickyNotes.get(2).getId(), stickyNotes.get(3).getId()),
                new NodeLinkEntity(stickyNotes.get(3).getId(), null),
                new NodeLinkEntity(kanbans.get(2).getId(), stickyNotes.get(4).getId()),
                new NodeLinkEntity(stickyNotes.get(4).getId(), stickyNotes.get(5).getId()),
                new NodeLinkEntity(stickyNotes.get(5).getId(), null));
        this.nodeLinkRepository.saveAll(nodes);

        List<UserEntity> users= Arrays.asList(
                new UserEntity(null, "system", "system@sehippocampus.work", passwordEncoder.encode("password"), "", true),
                new UserEntity(null, "user", "user@sehippocampus.work", passwordEncoder.encode("password"), "", false)
                );
        userRepository.saveAll(users);
    }
}
