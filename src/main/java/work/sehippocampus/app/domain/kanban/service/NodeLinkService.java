package work.sehippocampus.app.domain.kanban.service;

import work.sehippocampus.app.domain.kanban.entity.NodeLinkEntity;
import work.sehippocampus.app.domain.kanban.form.NodeLinkForm;

import java.util.List;

public interface NodeLinkService {

    List<NodeLinkEntity> getNodes();

    List<NodeLinkEntity> upsertNodes(List<NodeLinkForm> forms);
}
