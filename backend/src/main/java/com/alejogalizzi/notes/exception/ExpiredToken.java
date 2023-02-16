package com.alejogalizzi.notes.exception;

public class ExpiredToken extends RuntimeException {

  public ExpiredToken(String msg) {
    super(msg);
  }
}
