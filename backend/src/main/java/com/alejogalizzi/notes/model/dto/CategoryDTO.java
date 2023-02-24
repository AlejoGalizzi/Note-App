package com.alejogalizzi.notes.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
  private long id;

  @NotBlank(message = "Category name cannot be null or empty")
  @Size(min = 3, max = 20, message = "Category name must have length between 3 and 20 characters")
  private String name;

  @NotBlank(message = "Color must not be blank or empty")
  private String color;
}
