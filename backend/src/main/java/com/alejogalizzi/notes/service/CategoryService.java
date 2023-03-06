package com.alejogalizzi.notes.service;

import com.alejogalizzi.notes.exception.AlreadyRegister;
import com.alejogalizzi.notes.exception.NotFoundException;
import com.alejogalizzi.notes.mapper.CategoryMapper;
import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.entity.Category;
import com.alejogalizzi.notes.repository.CategoryRepository;
import com.alejogalizzi.notes.service.abstraction.ICategoryService;
import java.util.List;
import java.util.Optional;
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
    return CategoryMapper.entityToDTO(categoryRepository.findByName(name));
  }

  @Override
  public Optional<CategoryDTO> findById(long id) {
    Category category = categoryRepository.findById(id).orElse(null);
    if(category == null) {
      throw new NotFoundException(String.format("Category not found with id %s", id));
    }
    return Optional.of(CategoryMapper.entityToDTO(category));
  }

  @Override
  public CategoryDTO save(CategoryDTO categoryDTO) {
    if(categoryRepository.existsByName(categoryDTO.getName())) {
      throw new AlreadyRegister("Category already registered");
    }
    Category category = new Category();
    category.setName(categoryDTO.getName());
    category.setColor(categoryDTO.getColor());
    return CategoryMapper.entityToDTO(categoryRepository.save(category));
  }

  @Override
  public void deleteById(long id) {
    if(categoryRepository.findById(id).isPresent()){
      categoryRepository.deleteById(id);
    }
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
