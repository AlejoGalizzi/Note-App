package com.alejogalizzi.notes.repository;

import com.alejogalizzi.notes.model.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

  boolean existsByName(String name);
}
