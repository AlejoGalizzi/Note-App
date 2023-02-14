package com.alejogalizzi.notes.service;

import com.alejogalizzi.notes.exception.AlreadyRegister;
import com.alejogalizzi.notes.mapper.CategoryMapper;
import com.alejogalizzi.notes.mapper.NoteMapper;
import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.entity.Category;
import com.alejogalizzi.notes.repository.CategoryRepository;
import com.alejogalizzi.notes.service.abstraction.ICategoryService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService implements ICategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public List<CategoryDTO> findAll() {
    return CategoryMapper.mapListToDTOs(categoryRepository.findAll());
  }

  @Override
  public CategoryDTO findByName(String name) {
    return new CategoryDTO(categoryRepository.findByName(name).getName());
  }

  @Override
  public void save(CategoryDTO categoryDTO) {
    if(categoryRepository.existsByName(categoryDTO.getName())) {
      throw new AlreadyRegister("Category already registered");
    }
    Category category = new Category();
    category.setName(categoryDTO.getName());
    categoryRepository.save(category);
  }

  @Override
  public List<Category> getCategoriesDTOs(List<CategoryDTO> categories) {
    return categories.stream().map(category -> {
      Category categoryDB = categoryRepository.findByName(category.getName());
      if(categoryDB == null) {
        Category newCategory = new Category();
        newCategory.setName(category.getName());
        return categoryRepository.save(newCategory);
      }
      return categoryDB;
    }).collect(Collectors.toList());
  }

}
