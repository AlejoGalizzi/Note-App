package com.alejogalizzi.notes.exception;

import io.jsonwebtoken.ExpiredJwtException;
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
    error.add(e.getMessage(), "Entity");
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(value = InvalidCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(
      InvalidCredentialsException e) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.FORBIDDEN.value());
    error.add(e.getMessage(), "User");
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(value = DisableExtension.class)
  public ResponseEntity<ErrorResponse> handleDisableExtension(DisableExtension e) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.CONFLICT.value());
    error.add(e.getMessage(), "User");
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(value = IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException e) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
    error.add(e.getMessage(), "Token");
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(value = ExpiredJwtException.class)
  public ResponseEntity<ErrorResponse> handleExpiredJwtException(IllegalArgumentException e) {
    ErrorResponse error = new ErrorResponse();
    error.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
    error.add(e.getMessage(), "Token");
    error.setTimestamp(Timestamp.from(Instant.now()));
    return new ResponseEntity<>(error, HttpStatus.CONFLICT);
  }


}
