package work.sehippocampus.app.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AppError {
    STICKY_NOTE_NOT_FOUND("sticky note not found", HttpStatus.NOT_FOUND),
    NODE_NOTE_NOT_FOUND("node not found", HttpStatus.NOT_FOUND),
    ACCOUNT_NOT_FOUNT("account not found", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus status;

    AppError(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
