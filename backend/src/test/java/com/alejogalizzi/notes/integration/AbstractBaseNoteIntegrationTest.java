package com.alejogalizzi.notes.integration;

import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.client.MockRestServiceServer;

public class AbstractBaseNoteIntegrationTest {

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
}
