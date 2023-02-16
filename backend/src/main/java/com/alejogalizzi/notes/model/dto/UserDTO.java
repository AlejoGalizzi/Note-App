package com.alejogalizzi.notes.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

  private long id;

  @NotBlank(message = "Username must not be null or empty")
  @Max(value = 15)
  private String username;

  @NotBlank(message = "Password must not be null or empty")
  @Size(min = 8, max = 16, message = "Password must have between 8 and 16 characters")
  private String password;
}
