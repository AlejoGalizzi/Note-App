package com.alejogalizzi.notes.controller;

import com.alejogalizzi.notes.exception.DisableExtension;
import com.alejogalizzi.notes.exception.InvalidCredentialsException;
import com.alejogalizzi.notes.jwt.JwtTokenUtil;
import com.alejogalizzi.notes.model.dto.UserDTO;
import com.alejogalizzi.notes.model.response.JwtResponse;
import com.alejogalizzi.notes.jwt.JwtUserDetailsService;
import com.alejogalizzi.notes.service.abstraction.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

  @Autowired
  private IUserService userService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  private JwtUserDetailsService userDetailsService;

  public AuthenticationController(JwtTokenUtil jwtTokenUtil) {
    this.jwtTokenUtil = jwtTokenUtil;
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody UserDTO user) {
    userService.createUser(user);
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @PostMapping(value = "/authenticate")
  public ResponseEntity<?> createAuthenticateToken(@RequestBody UserDTO user) {
    authenticate(user.getUsername(), user.getPassword());

    final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

    final String token = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new JwtResponse(token));
  }

  private void authenticate(String username, String password) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new DisableExtension("User disabled");
    } catch (BadCredentialsException e) {
      throw new InvalidCredentialsException("Wrong credentials");
    }
  }


}
