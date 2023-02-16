package com.alejogalizzi.notes.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.alejogalizzi.notes.exception.ErrorResponse;
import com.alejogalizzi.notes.model.dto.CategoryDTO;
import com.alejogalizzi.notes.model.dto.NoteDTO;
import com.alejogalizzi.notes.model.entity.Category;
import com.alejogalizzi.notes.model.entity.Note;
import com.alejogalizzi.notes.model.entity.User;
import com.alejogalizzi.notes.repository.CategoryRepository;
import com.alejogalizzi.notes.repository.IUserRepository;
import com.alejogalizzi.notes.repository.NoteRepository;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PostNoteIntegrationTest extends AbstractBaseNoteIntegrationTest {

  @MockBean
  private NoteRepository noteRepository;

  @MockBean
  private CategoryRepository categoryRepository;

  @MockBean
  private IUserRepository userRepository;

  private User user;
  private Note note1;

  private Category category1;

  @Before
  public void setUp() {
    createTokenHeader();
    user = new User(1L, USERNAME, PASSWORD);
    category1 = new Category(1L, CATEGORY_NAME_1, Date.from(
        Instant.now()));
    Category category2 = new Category(1L, CATEGORY_NAME_2, Date.from(
        Instant.now()));
    Category category3 = new Category(1L, CATEGORY_NAME_3, Date.from(
        Instant.now()));
    note1 = new Note(1L, NOTE_NAME_1, CONTENT_1, false,
        Collections.singletonList(category1), Date.from(Instant.now()), Date.from(Instant.now()));
  }

  @Test
  public void shouldCreateNote() {
    when(noteRepository.save(any(Note.class))).thenReturn(note1);
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);

    HttpEntity<NoteDTO> request = new HttpEntity<>(
        createRequest(NOTE_NAME_1, CONTENT_1, Arrays.asList(new CategoryDTO(CATEGORY_NAME_1))),
        headers);

    ResponseEntity<Void> response = restTemplate.exchange(createURLWithPort(NOTE_PATH),
        HttpMethod.POST, request, Void.class);

    assertEquals(response.getStatusCode(), HttpStatus.CREATED);
  }

  @Test
  public void shouldNotCreateNoteWhenPassingNoteWithNullName() {
    when(noteRepository.save(any(Note.class))).thenReturn(note1);
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    HttpEntity<NoteDTO> request = new HttpEntity<>(
        createRequest(null, CONTENT_1, List.of(new CategoryDTO(CATEGORY_NAME_1))), headers);

    ResponseEntity<ErrorResponse> response = restTemplate.exchange(createURLWithPort(NOTE_PATH),
        HttpMethod.POST, request, ErrorResponse.class);

    assertEquals(response.getStatusCode(), HttpStatus.UNPROCESSABLE_ENTITY);
    assertNotNull(response.getBody());
    assertEquals(response.getBody().getMessages().size(), 1);
  }

  @Test
  public void shouldNotCreateNoteWhenPassingNoteWithNullNameAndNullContent() {
    when(noteRepository.save(any(Note.class))).thenReturn(note1);
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    HttpEntity<NoteDTO> request = new HttpEntity<>(
        createRequest(null, null, List.of(new CategoryDTO(CATEGORY_NAME_1))), headers);

    ResponseEntity<ErrorResponse> response = restTemplate.exchange(createURLWithPort(NOTE_PATH),
        HttpMethod.POST, request, ErrorResponse.class);

    assertEquals(response.getStatusCode(), HttpStatus.UNPROCESSABLE_ENTITY);
    assertNotNull(response.getBody());
    assertEquals(response.getBody().getMessages().size(), 2);
  }

  @Test
  public void shouldCreateCategory() {
    when(categoryRepository.save(any(Category.class))).thenReturn(category1);
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    HttpEntity<CategoryDTO> request = new HttpEntity<>(new CategoryDTO(CATEGORY_NAME_1), headers);

    ResponseEntity<Void> response = restTemplate.exchange(createURLWithPort(CATEGORY_ADD),
        HttpMethod.POST, request, Void.class);

    assertEquals(response.getStatusCode(), HttpStatus.CREATED);
  }

  @Test
  public void shouldNotCreateCategoryWhenSendEmptyName() {
    when(categoryRepository.save(any(Category.class))).thenReturn(category1);
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    HttpEntity<CategoryDTO> request = new HttpEntity<>(new CategoryDTO(null), headers);

    ResponseEntity<ErrorResponse> response = restTemplate.exchange(createURLWithPort(CATEGORY_ADD),
        HttpMethod.POST, request, ErrorResponse.class);

    assertEquals(response.getStatusCode(), HttpStatus.UNPROCESSABLE_ENTITY);
    assertNotNull(response.getBody());
    assertEquals(response.getBody().getMessages().size(), 1);
  }
}
