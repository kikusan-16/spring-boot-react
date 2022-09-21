package work.sehippocampus.app.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ErrorMessage {

    private Integer status;
    private String message;
}