package com.alejogalizzi.notes.service;

import com.alejogalizzi.notes.exception.AlreadyRegister;
import com.alejogalizzi.notes.model.dto.UserDTO;
import com.alejogalizzi.notes.model.entity.User;
import com.alejogalizzi.notes.repository.IUserRepository;
import com.alejogalizzi.notes.service.abstraction.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

  @Autowired
  private IUserRepository userRepository;

  @Override
  public void createUser(UserDTO userDTO) {
    if (userRepository.findByUsername(userDTO.getUsername()) != null) {
      throw new AlreadyRegister("User is already registered");
    }
    User user = new User();
    user.setUsername(userDTO.getUsername());
    user.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
    userRepository.save(user);
  }
}
