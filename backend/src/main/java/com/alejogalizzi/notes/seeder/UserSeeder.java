package com.alejogalizzi.notes.seeder;

import com.alejogalizzi.notes.model.entity.User;
import com.alejogalizzi.notes.repository.IUserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

  private static final List<String> USERNAMES = List.of("Luitgard", "Christel", "Stefanie",
      "Oswald", "Ottomar", "Johann", "Moses", "Ianis", "Ashlyn", "Maria");

  private static final List<String> PASSWORDS = List.of("t0400e3ps", "p00846e4p", "f94475j9f",
      "k15564g6k", "j654110j9j", "r05400e4r", "a987103h7a", "e62685b1e", "d25548a0d", "k97165d3k");

  @Autowired
  private IUserRepository userRepository;

  @Override
  public void run(String... args) {
    seedUserTable();
  }

  private void seedUserTable() {
    if(userRepository.count() == 0) {
      createUsers();
    }
  }

  private void createUsers() {
    for (int index = 0; index < 10; index++) {
      createUser(USERNAMES.get(index),
          PASSWORDS.get(index));
    }
  }

  private void createUser(String username, String password) {
    User user = new User();
    user.setUsername(username);
    user.setPassword(password);
    userRepository.save(user);
  }
}
