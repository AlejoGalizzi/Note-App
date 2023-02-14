package com.alejogalizzi.notes.service.abstraction;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import com.alejogalizzi.notes.model.entity.Category;
import java.util.List;

public interface INoteService {

  List<NoteDTO> findAll(boolean isArchived);

  List<NoteDTO> filterNotesByCategoryName(String categoryName, boolean isArchived);

  NoteDTO findById(long id);

  void save(NoteDTO note, List<Category> categoriesDTOs);

  NoteDTO update(NoteDTO note, long id, List<Category> categories);

  void delete(long id);

  void changeArchive(long id);

  void addCategories(List<CategoryDTO> categories, long id);
}
