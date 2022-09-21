package work.sehippocampus.app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AppExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorMessage> handleAppException(AppException exception) {
        return responseErrorMessages(exception.getMessage(), exception.getError().getStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleException(Exception exception) {
        return responseErrorMessages("internal server error", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    private ResponseEntity<ErrorMessage> responseErrorMessages(String message, HttpStatus status) {
        ErrorMessage errorMessage = ErrorMessage.builder().status(status.value()).message(message).build();
        return new ResponseEntity<>(errorMessage, status);
    }
}
