package com.alejogalizzi.notes.exception;

import org.springframework.security.authentication.DisabledException;

public class DisableExtension extends DisabledException {

  public DisableExtension(String msg) {
    super(msg);
  }
}
