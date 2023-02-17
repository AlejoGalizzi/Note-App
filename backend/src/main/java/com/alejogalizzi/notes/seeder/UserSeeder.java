package com.alejogalizzi.notes.seeder;

import com.alejogalizzi.notes.model.entity.User;
import com.alejogalizzi.notes.repository.IUserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

  private static final List<String> USERNAMES = List.of("Luitgard", "Christel", "Stefanie",
      "Oswald");

  private static final List<String> PASSWORDS = List.of("myPassword", "myPassword123", "myPassword653",
      "myPassword6123");

  @Autowired
  private PasswordEncoder passwordEncoder;

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
    for (int index = 0; index < 4; index++) {
      createUser(USERNAMES.get(index),
          PASSWORDS.get(index));
    }
  }

  private void createUser(String username, String password) {
    User user = new User();
    user.setUsername(username);

    user.setPassword(passwordEncoder.encode(password));
    userRepository.save(user);
  }
}
