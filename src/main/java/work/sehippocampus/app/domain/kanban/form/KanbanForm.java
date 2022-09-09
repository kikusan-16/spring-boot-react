package work.sehippocampus.app.domain.kanban.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KanbanForm {
    private String id;
    private String title;
    private Integer lineNumber;
    private String type;
}
