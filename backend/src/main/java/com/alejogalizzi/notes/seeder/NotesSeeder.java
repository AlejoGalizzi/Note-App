package com.alejogalizzi.notes.seeder;

import com.alejogalizzi.notes.model.entity.Category;
import com.alejogalizzi.notes.model.entity.Note;

import com.alejogalizzi.notes.repository.CategoryRepository;
import com.alejogalizzi.notes.repository.NoteRepository;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class NotesSeeder implements CommandLineRunner {

  private static final List<String> NAMES = List.of("Note 1", "Note 2", "Note 3",
      "Note 4", "Note 5");

  private static final List<String> CONTENTS = List.of("Content 1", "Content 2", "Content 3",
      "Content 4", "Content 5");

  private static final List<String> CATEGORIES = List.of("Category 1", "Category 2", "Category 3");

  @Autowired
  private NoteRepository noteRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public void run(String... args) {
    seedNoteTable();
  }

  private void seedNoteTable() {
    if(noteRepository.count() == 0 && categoryRepository.count() == 0) {
      createNotes();
    }
  }

  private void createNotes() {
    for (int index = 0; index < 5; index++) {
      Random rand = new Random();
      int randomNumber = rand.nextInt(3);
      createNote(NAMES.get(index),
          CONTENTS.get(index),
          CATEGORIES.get(randomNumber));
    }

  }

  private void createNote(String name, String content, String categoryName) {
    Category category = categoryRepository.findByName(categoryName);
    Note note = new Note();
    note.setName(name);
    note.setContent(content);
    if(category == null) {
      category = new Category();
      category.setName(categoryName);
      category.setColor("#808080");
      categoryRepository.save(category);
    };
    note.setCategories(Collections.singletonList(category));
    noteRepository.save(note);
  }
}
