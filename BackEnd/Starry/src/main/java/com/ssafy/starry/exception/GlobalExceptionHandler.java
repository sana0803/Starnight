package com.ssafy.starry.exception;

import static com.ssafy.starry.common.utils.constants.ResponseConstants.BAD_REQUEST;
import static com.ssafy.starry.common.utils.constants.ResponseConstants.FORBIDDEN;
import static com.ssafy.starry.common.utils.constants.ResponseConstants.WORD_NOT_VALID;

import com.ssafy.starry.exception.valid.ForbiddenWordException;
import com.ssafy.starry.exception.valid.WordNotValidException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

//    // Valid 조건을 만족하지 못한 요청에 대한 에러 핸들러
//    @Override
//    protected ResponseEntity<Object> handleMethodArgumentNotValid(
//        MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status,
//        WebRequest request) {
//        log.debug("Vaildation failed", ex);
//        return VALIDATION_FAILED;
//    }

    @ExceptionHandler(ForbiddenWordException.class)
    public ResponseEntity<String> handleForbiddenWordException(
        ForbiddenWordException ex
    ){
        log.debug("Forbidden word: searchWords", ex);
        return FORBIDDEN;
    }

    @ExceptionHandler(WordNotValidException.class)
    public ResponseEntity<String> handleForbiddenWordException(
        WordNotValidException ex
    ){
        log.debug("Word not valid: not null && 1 <= word.length <= 10", ex);
        return WORD_NOT_VALID;
    }

    // 5xx error handler : 서버에서 발생한 전반적인 에러에 대한 핸들러
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        ExceptionResponse exceptionResponse = ExceptionResponse.builder()
            .Error(request.getDescription(false))
            .message(ex.getMessage())
            .build();
        log.debug("server error", ex);
        return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
