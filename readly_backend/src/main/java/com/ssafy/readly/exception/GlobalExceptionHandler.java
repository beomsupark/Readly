package com.ssafy.readly.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> exception(MethodArgumentNotValidException e, HttpServletRequest request) {
        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
        Map<String,Object> map = new HashMap<>();
        String message = "";
        for (FieldError fieldError : fieldErrors) {
            String field = fieldError.getField();
            message += field + ", ";
        }
        message += "해당 값들이 존재하지 않습니다.";
        map.put("errorMessage",message);
        return new ResponseEntity<Map<String,Object>>(map, HttpStatus.BAD_REQUEST);
    }
}
