package com.alejogalizzi.notes.service.abstraction;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.entity.Category;
import java.util.List;
import java.util.Optional;

public interface ICategoryService {

  List<CategoryDTO> findAll();

  CategoryDTO findByName(String name);

  Optional<CategoryDTO> findById(long id);

  void save(CategoryDTO categoryDTO);

  void deleteById(long id);

  List<Category> getCategoriesDTOs(List<CategoryDTO> categories);
}
