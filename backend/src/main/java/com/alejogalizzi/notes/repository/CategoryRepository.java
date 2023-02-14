package com.alejogalizzi.notes.repository;

import com.alejogalizzi.notes.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

  Category findByName(String name);

  boolean existsByName(String name);
}
