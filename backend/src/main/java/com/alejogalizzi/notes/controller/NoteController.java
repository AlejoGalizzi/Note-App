package com.alejogalizzi.notes.controller;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import com.alejogalizzi.notes.service.abstraction.ICategoryService;
import com.alejogalizzi.notes.service.abstraction.INoteService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notes")
public class NoteController {

  @Autowired
  public INoteService noteService;

  @Autowired
  ICategoryService categoryService;

  @GetMapping
  public ResponseEntity<List<NoteDTO>> getNotes(
      @RequestParam(required = false, defaultValue = "false") boolean isArchived) {
    return ResponseEntity.ok(noteService.findAll(isArchived));

  }

  @GetMapping("/filter-by-category/{categoryName}")
  public ResponseEntity<List<NoteDTO>> getActiveNotesByCategory(
      @PathVariable("categoryName") String categoryName,
      @RequestParam(required = false, defaultValue = "false") boolean isArchived) {
    return ResponseEntity.ok(noteService.filterNotesByCategoryName(categoryName, isArchived));
  }

  @GetMapping("/{id}")
  public ResponseEntity<NoteDTO> getNote(@PathVariable long id) {
    return ResponseEntity.ok(noteService.findById(id));
  }

  @PostMapping
  public ResponseEntity<Void> createNote(@Valid @RequestBody final NoteDTO noteDTO) {
    noteService.save(noteDTO, categoryService.getCategoriesDTOs(noteDTO.getCategories()));
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PostMapping("/add-category")
  public ResponseEntity<Void> createCategory(@Valid @RequestBody final CategoryDTO category) {
    categoryService.save(category);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PostMapping("/change-status/{id}")
  public ResponseEntity<?> changeStatus(@PathVariable long id) {
    noteService.changeArchive(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<NoteDTO> updateNote(@PathVariable long id,
      @Valid @RequestBody final NoteDTO noteDTO) {
    return ResponseEntity.ok(noteService.update(noteDTO, id,
        categoryService.getCategoriesDTOs(noteDTO.getCategories())));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteNote(@PathVariable long id) {
    noteService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
