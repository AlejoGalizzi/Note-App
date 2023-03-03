package com.alejogalizzi.notes.mapper;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.entity.Category;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class CategoryMapper {

  public static List<CategoryDTO> mapListToDTOs(List<Category> categories) {
    return categories.stream().map(category -> new CategoryDTO(category.getId(),category.getName(), category.getColor())
    ).collect(Collectors.toList());
  }

  public static CategoryDTO entityToDTO(Category category) {
    return new CategoryDTO(category.getId(), category.getName(), category.getColor());
  }
}
