package com.alejogalizzi.notes.integration;

import com.alejogalizzi.notes.jwt.JwtTokenUtil;
import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.client.MockRestServiceServer;

public class AbstractBaseNoteIntegrationTest {

  @Value("secret.key")
  private String secret;

  protected static final String USERNAME = "Alejo";

  protected static final String PASSWORD = "Passorwd";

  protected static final String NOTE_PATH = "/notes";

  protected static final String NOTE_CATEGORY_FILTER = NOTE_PATH + "/filter-by-category/";

  protected static final String CATEGORY_ADD = NOTE_PATH + "/add-category";

  protected static final String CATEGORY_PATH = NOTE_PATH + "/categories";

  protected static final String NOTE_NAME_1 = "Note 1";
  protected static final String NOTE_NAME_2 = "Note 2";
  protected static final String NOTE_NAME_3 = "Note 3";

  protected static final String NOTE_NAME_4 = "Note 1";

  protected static final String CONTENT_1 = "Content 1";
  protected static final String CONTENT_2 = "Content 2";

  protected static final String CATEGORY_NAME_1 = "Category 1";

  protected static final String CATEGORY_NAME_2 = "Category 2";

  protected static final String CATEGORY_NAME_3 = "Category 3";

  protected static final String CATEGORY_COLOR = "#808080";

  protected TestRestTemplate restTemplate = new TestRestTemplate();

  protected MockRestServiceServer mockServer;
  protected HttpHeaders headers = new HttpHeaders();
  @LocalServerPort
  private int port;
  protected String createURLWithPort(String uri) {
    return "http://localhost:" + port + uri;
  }

  protected NoteDTO createRequest(String name, String content, List<CategoryDTO> categories) {
    NoteDTO note = new NoteDTO();
    note.setName(name);
    note.setContent(content);
    note.setCategories(categories);
    return note;
  }

  protected void createTokenHeader() {
    Map<String, Object> claims = new HashMap<>();
    headers.set(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", createTokenInHeader(claims)));
  }

  private String createTokenInHeader(Map<String, Object> claims) {

    return Jwts.builder()
        .setClaims(claims)
        .setSubject(USERNAME)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)).signWith(
            SignatureAlgorithm.HS256, secret).compact();
  }
}
