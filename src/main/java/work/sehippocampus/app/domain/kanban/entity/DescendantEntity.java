package work.sehippocampus.app.domain.kanban.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class DescendantEntity {
    @Id
    private String id;
    private String next;
}
