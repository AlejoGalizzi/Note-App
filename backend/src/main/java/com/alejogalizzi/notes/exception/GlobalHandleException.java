package com.alejogalizzi.notes.exception;

import java.sql.Timestamp;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalHandleException {


  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException e) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
    for (FieldError fieldError : e.getFieldErrors()) {
      error.add(fieldError.getDefaultMessage(), fieldError.getField());
    }
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @ExceptionHandler(value = AlreadyRegister.class)
  public ResponseEntity<ErrorResponse> handleAlreadyRegisterException(AlreadyRegister e) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.CONFLICT.value());
    error.add(e.getMessage(),"Entity");
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

}
