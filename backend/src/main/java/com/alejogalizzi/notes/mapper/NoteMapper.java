package com.alejogalizzi.notes.mapper;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import com.alejogalizzi.notes.model.entity.Category;
import com.alejogalizzi.notes.model.entity.Note;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class NoteMapper {

  public static Note createMapToNote(NoteDTO note, List<Category> categories) {
    Note noteEntity = new Note();
    noteEntity.setName(note.getName());
    noteEntity.setContent(note.getContent());
    noteEntity.setArchived(false);
    noteEntity.setUpdatedAt(Date.from(Instant.now()));
    noteEntity.setCategories(categories);
    return noteEntity;
  }

  public static void updateMapToNote(NoteDTO noteDTO, Note note, List<Category> categories) {
    note.setName(noteDTO.getName());
    note.setContent(noteDTO.getContent());
    note.setUpdatedAt(Date.from(Instant.now()));
    note.setCategories(categories);
  }

  public static NoteDTO getMapperFromNote(Note note) {
    return new NoteDTO(note.getId(), note.getName(), note.getContent(), note.isArchived(),
        note.getCategories().stream().map(category -> new CategoryDTO(category.getId(),category.getName(), category.getColor()))
            .collect(
                Collectors.toList()), note.getUpdatedAt());
  }

  public static List<NoteDTO> mapListToDTOs(List<Note> notes) {
    return notes.stream().map(
        note -> new NoteDTO(note.getId(), note.getName(), note.getContent(), note.isArchived(),
            note.getCategories().stream().map(category -> new CategoryDTO(category.getId(),category.getName(), category.getColor()))
                .collect(
                    Collectors.toList()), note.getUpdatedAt())
    ).collect(Collectors.toList());

  }
}
