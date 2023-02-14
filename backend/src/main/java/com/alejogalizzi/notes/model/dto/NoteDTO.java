package com.alejogalizzi.notes.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoteDTO {

  private long id;

  @NotBlank(message = "Name cannot be null or empty")
  @Size(min = 2, max = 60, message = "Name must have a length between 2 and 60 characters")
  private String name;

  @NotBlank(message = "Content cannot be null or empty")
  private String content;

  private boolean isArchived;

  @NotNull(message = "List of category must not be null")
  private List<CategoryDTO> categories;

  @JsonFormat(pattern = "dd-MM-yyyy")
  private Date updatedAt;

}
