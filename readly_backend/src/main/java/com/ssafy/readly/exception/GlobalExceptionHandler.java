package com.ssafy.readly.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.sasl.AuthenticationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class  GlobalExceptionHandler {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> exception(MethodArgumentNotValidException e, HttpServletRequest request) {
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        Map<String,Object> map = new HashMap<>();
        StringBuilder message = new StringBuilder();
        String longMsg = "";

        for (FieldError fieldError : fieldErrors) {
            String field = fieldError.getDefaultMessage();
            if(field.length() > 6) {
                longMsg += " " + field;
                continue;
            }
            message.append(field).append(", ");
        }

        if (!message.isEmpty()) {
            message.setLength(message.length() - 2); // 마지막 ", " 제거
            message.append("의 값을 입력해주세요.");
        }

        if(!longMsg.isEmpty()) {
            message.append(longMsg);
        }

        map.put("errorMessage", message);
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("errorMessage", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = NoSuchElementException.class)
    public ResponseEntity<Map<String, Object>> handleNoSuchElementException(NoSuchElementException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("errorMessage", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = AuthenticationException.class)
    public ResponseEntity<Map<String, Object>> handleAuthenticationException(AuthenticationException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("errorMessage", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = UnAuthorizedException.class)
    public ResponseEntity<Map<String, Object>> handleUnAuthorizedException(UnAuthorizedException e) {
        Map<String, Object> map = new HashMap<>();
        map.put("errorMessage", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception e) {
        Map<String, Object> map = new HashMap<>();
        map.put("errorMessage", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
