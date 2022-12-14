package work.sehippocampus.app.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum AppError {
    IO_ERROR("io error", HttpStatus.INTERNAL_SERVER_ERROR),
    VIDEO_NOT_FOUND("video not found", HttpStatus.NOT_FOUND),
    STICKY_NOTE_NOT_FOUND("sticky note not found", HttpStatus.NOT_FOUND),
    NODE_NOTE_NOT_FOUND("node not found", HttpStatus.NOT_FOUND),
    ACCOUNT_NOT_FOUNT("account not found", HttpStatus.NOT_FOUND),
    LOGIN_INFO_INVALID("login information is invalid", HttpStatus.UNPROCESSABLE_ENTITY);

    private final String message;
    private final HttpStatus status;

    AppError(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
