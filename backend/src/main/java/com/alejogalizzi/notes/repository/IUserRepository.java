package com.alejogalizzi.notes.repository;

import com.alejogalizzi.notes.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface IUserRepository extends JpaRepository<User, Long> {

  User findByUsername(String username);
}
