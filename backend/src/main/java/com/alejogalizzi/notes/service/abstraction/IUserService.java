package com.alejogalizzi.notes.service.abstraction;

import com.alejogalizzi.notes.model.dto.UserDTO;

public interface IUserService {

  void createUser(UserDTO userDTO);
}
