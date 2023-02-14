package com.alejogalizzi.notes.exception;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {

  private int status;
  private Map<String,String> messages;
  private Timestamp timestamp;
  public ErrorResponse() {
    this.messages = new HashMap<>();
  }
  public void add(String message, String field) {
    this.messages.put(field,message);
  }
}
