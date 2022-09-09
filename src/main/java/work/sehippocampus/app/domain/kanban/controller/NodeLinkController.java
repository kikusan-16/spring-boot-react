package work.sehippocampus.app.domain.kanban.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import work.sehippocampus.app.domain.kanban.entity.NodeLinkEntity;
import work.sehippocampus.app.domain.kanban.form.NodeLinkForm;
import work.sehippocampus.app.domain.kanban.service.NodeLinkService;

import java.util.List;

@RestController
@RequestMapping("/api/nodes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class NodeLinkController {
    private final NodeLinkService nodeLinkService;

    @GetMapping
    public List<NodeLinkEntity> getAll() {
        return nodeLinkService.getNodes();
    }

    @PostMapping
    public List<NodeLinkEntity> upsert(@RequestBody List<NodeLinkForm> forms) {
        return nodeLinkService.upsertNodes(forms);
    }
}
