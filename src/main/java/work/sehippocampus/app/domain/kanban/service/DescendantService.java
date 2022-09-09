package work.sehippocampus.app.domain.kanban.service;

import work.sehippocampus.app.domain.kanban.entity.DescendantEntity;
import work.sehippocampus.app.domain.kanban.form.DescendantForm;

import java.util.List;

public interface DescendantService {

    List<DescendantEntity> getDescendants();

    List<DescendantEntity> upsertDescendants(List<DescendantForm> forms);
}
