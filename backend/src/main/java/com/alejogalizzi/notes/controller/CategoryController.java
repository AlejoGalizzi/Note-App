package com.alejogalizzi.notes.controller;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.service.abstraction.ICategoryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoryController {
  @Autowired
  ICategoryService categoryService;


  @GetMapping
  public ResponseEntity<List<CategoryDTO>> getCategories() {
    return ResponseEntity.ok(categoryService.findAll());
  }

  @PostMapping( )
  public ResponseEntity<CategoryDTO> createCategory(@Valid @RequestBody final CategoryDTO category) {
    ;
    return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.save(category));
  }

  @GetMapping("/{id}")
  public ResponseEntity<CategoryDTO> getCategory(@PathVariable long id) {
    return ResponseEntity.ok(categoryService.findById(id).get());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteCategory(@PathVariable long id) {
    categoryService.deleteById(id);
    return ResponseEntity.noContent().build();
  }


}
