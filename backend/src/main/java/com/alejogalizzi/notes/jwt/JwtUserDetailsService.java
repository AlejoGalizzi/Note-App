package com.alejogalizzi.notes.jwt;

import com.alejogalizzi.notes.exception.NotFoundException;
import com.alejogalizzi.notes.model.entity.User;
import com.alejogalizzi.notes.repository.IUserRepository;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

  @Autowired
  private IUserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username);

    if (user == null) {
      throw new NotFoundException("User not found with username" + username);
    }
    return new org.springframework.security.core.userdetails.User(user.getUsername(),
        user.getPassword(), new ArrayList<>());
  }
}
