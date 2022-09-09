package work.sehippocampus.app.domain.kanban.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import work.sehippocampus.app.domain.kanban.entity.DescendantEntity;
import work.sehippocampus.app.domain.kanban.form.DescendantForm;
import work.sehippocampus.app.domain.kanban.service.DescendantService;

import java.util.List;

@RestController
@RequestMapping("/api/descendants")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DescendantController {
    private final DescendantService descendantService;

    @GetMapping
    public List<DescendantEntity> getAll() {
        return descendantService.getDescendants();
    }

    @PostMapping
    public List<DescendantEntity> upsert(@RequestBody List<DescendantForm> forms) {
        return descendantService.upsertDescendants(forms);
    }
}
