package com.alejogalizzi.notes.service;

import com.alejogalizzi.notes.exception.AlreadyRegister;
import com.alejogalizzi.notes.exception.NotFoundException;
import com.alejogalizzi.notes.mapper.NoteMapper;
import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import com.alejogalizzi.notes.model.entity.Category;
import com.alejogalizzi.notes.model.entity.Note;
import com.alejogalizzi.notes.repository.NoteRepository;
import com.alejogalizzi.notes.service.abstraction.INoteService;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoteService implements INoteService {

  @Autowired
  public NoteRepository noteRepository;

  @Override
  public List<NoteDTO> findAll(boolean isArchived) {
    return NoteMapper.mapListToDTOs(noteRepository.findAll()).stream().filter(note ->
      isArchived == note.isArchived()
    ).toList();
  }

  @Override
  public List<NoteDTO> filterNotesByCategoryName(String categoryName, boolean isArchived) {
    return findAll(isArchived).stream().filter(note -> {
      for (CategoryDTO category: note.getCategories()
      ) {
        if(Objects.equals(categoryName, category.getName())) {
          return true;
        }
      }
      return false;
    }).toList();
  }

  @Override
  public NoteDTO findById(long id) {
    Note noteEntity = noteRepository.findById(id).orElse(null);
    if (noteEntity != null) {
      return NoteMapper.getMapperFromNote(noteEntity);
    } else {
      throw new NotFoundException("Note with id " + id + " not found.");
    }
  }

  @Override
  public void save(NoteDTO note, List<Category> categories) {
    if (!noteRepository.existsByName(note.getName())) {
      noteRepository.save(NoteMapper.createMapToNote(note, categories));
    }else {
      throw new AlreadyRegister("Note with name " + note.getName() + " is already register");
    }
  }

  @Override
  public NoteDTO update(NoteDTO note, long id, List<Category> categories) {
    Note noteEntity = noteRepository.findById(id).orElse(null);
    if (noteEntity != null) {
      NoteMapper.updateMapToNote(note, noteEntity, categories);
      noteRepository.save(noteEntity);
      return NoteMapper.getMapperFromNote(noteEntity);
    } else {
      throw new NotFoundException("Note with id " + id + " not found.");
    }
  }

  @Override
  public void delete(long id) {
    if (noteRepository.existsById(id)) {
      noteRepository.deleteById(id);
    } else {
      throw new NotFoundException("Note with id " + id + " not found.");
    }
  }

  @Override
  public void changeArchive(long id) {
    Note noteEntity = noteRepository.findById(id).orElse(null);
    boolean finalState = Objects.requireNonNull(noteEntity).isArchived();
    noteEntity.setArchived(!finalState);
    noteRepository.save(noteEntity);
  }

  @Override
  public void addCategories(List<CategoryDTO> categories, long id) {

  }
}
