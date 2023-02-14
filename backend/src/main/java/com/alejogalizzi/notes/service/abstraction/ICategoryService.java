package com.alejogalizzi.notes.service.abstraction;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.entity.Category;
import java.util.List;

public interface ICategoryService {

  List<CategoryDTO> findAll();

  CategoryDTO findByName(String name);

  void save(CategoryDTO categoryDTO);

  List<Category> getCategoriesDTOs(List<CategoryDTO> categories);
}
