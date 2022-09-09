package work.sehippocampus.app.domain.kanban.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NodeLinkForm {
    private String id;
    private String next;
}
