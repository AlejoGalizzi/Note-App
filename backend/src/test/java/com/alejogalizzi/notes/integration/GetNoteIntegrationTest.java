package com.alejogalizzi.notes.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import com.alejogalizzi.notes.mapper.NoteMapper;
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
import java.util.Objects;
import java.util.Optional;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GetNoteIntegrationTest extends AbstractBaseNoteIntegrationTest {
  @MockBean
  private NoteRepository noteRepository;

  @MockBean
  private CategoryRepository categoryRepository;

  @MockBean
  private IUserRepository userRepository;

  private User user;
  private Note note1;
  private Note note2;
  private Note note3;
  private Note note4;

  private Category category1;
  private Category category2;
  private Category category3;


  @Before
  public void setUp() {
    createTokenHeader();
    user = new User(1L, USERNAME, PASSWORD);
    category1 = new Category(1L, CATEGORY_NAME_1, "#808080", Date.from(
        Instant.now()));
    category2 = new Category(1L, CATEGORY_NAME_2,"#808080", Date.from(
        Instant.now()));
    category3 = new Category(1L, CATEGORY_NAME_3,"#808080", Date.from(
        Instant.now()));
    note1 = new Note(1L, NOTE_NAME_1, CONTENT_1, false,
        Collections.singletonList(category1), Date.from(Instant.now()), Date.from(Instant.now()));
    note2 = new Note(1L, NOTE_NAME_2, CONTENT_2, false,
        Collections.singletonList(category1), Date.from(Instant.now()), Date.from(Instant.now()));
    note3 = new Note(1L, NOTE_NAME_3, CONTENT_1, true,
        Collections.singletonList(category3), Date.from(Instant.now()), Date.from(Instant.now()));
    note4 = new Note(1L, NOTE_NAME_4, CONTENT_2, false,
        Arrays.asList(category2, category3), Date.from(Instant.now()), Date.from(Instant.now()));
  }

  @Test
  public void shouldReturnAllNotes() throws Exception {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(noteRepository.findAll()).thenReturn(Arrays.asList(note1, note2));

    ResponseEntity<List<NoteDTO>> response = restTemplate.exchange(
        createURLWithPort(NOTE_PATH), HttpMethod.GET, new HttpEntity<>(headers),
        new ParameterizedTypeReference<List<NoteDTO>>() {});

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals(response.getBody().size(), 2);
  }

  @Test
  public void shouldReturnAllCategories() {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(categoryRepository.findAll()).thenReturn(Arrays.asList(category1,category2, category3));
    ResponseEntity<List<CategoryDTO>> response = restTemplate.exchange(
        createURLWithPort(CATEGORY_PATH), HttpMethod.GET, new HttpEntity<>(headers),
        new ParameterizedTypeReference<List<CategoryDTO>>() {});

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
    assertEquals(response.getBody().size(), 3);
  }

  @Test
  public void shouldReturnAllActiveNotes() {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(noteRepository.findAll()).thenReturn(Arrays.asList(note1,note2,note3,note4));
    List<NoteDTO> expected = NoteMapper.mapListToDTOs(Arrays.asList(note1,note2,note4));
    ResponseEntity<List<NoteDTO>> response = restTemplate.exchange(
        createURLWithPort(NOTE_PATH), HttpMethod.GET, new HttpEntity<>(headers),
        new ParameterizedTypeReference<List<NoteDTO>>() {});

    assertNotNull(response.getBody());
    assertEquals(Objects.requireNonNull(response.getBody()).size(),3);
  }

  @Test
  public void shouldReturnAllArchiveNotes() {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(noteRepository.findAll()).thenReturn(Arrays.asList(note1,note2,note3,note4));
    List<NoteDTO> expected = NoteMapper.mapListToDTOs(Arrays.asList(note1,note2,note4));
    ResponseEntity<List<NoteDTO>> response = restTemplate.exchange(
        createURLWithPort(NOTE_PATH+"?isArchived=true"), HttpMethod.GET, new HttpEntity<>(headers),
        new ParameterizedTypeReference<List<NoteDTO>>() {});

    assertNotNull(response.getBody());
    assertEquals(Objects.requireNonNull(response.getBody()).size(),1);
  }

  @Test
  public void shouldReturnNote() {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(noteRepository.findById(1L)).thenReturn(Optional.ofNullable(note1));
    ResponseEntity<NoteDTO> response = restTemplate.exchange(
        createURLWithPort(NOTE_PATH+"/1"),
        HttpMethod.GET, new HttpEntity<>(headers),
        NoteDTO.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    assertNotNull(response.getBody());
  }

  @Test
  public void shouldReturnFilterNotes() {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(noteRepository.findAll()).thenReturn(Arrays.asList(note1,note2,note3,note4));
    ResponseEntity<List<NoteDTO>> response = restTemplate.exchange(
        createURLWithPort(NOTE_CATEGORY_FILTER+category1.getName()),
        HttpMethod.GET, new HttpEntity<>(headers),
        new ParameterizedTypeReference<List<NoteDTO>>() {});
    assertNotNull(response.getBody());
    assertEquals(response.getBody().size(),2);
  }

  @Test
  public void shouldReturnNoNotesWhenFilter() {
    when(userRepository.findByUsername(USERNAME)).thenReturn(user);
    when(noteRepository.findAll()).thenReturn(Arrays.asList(note1,note2,note3,note4));
    ResponseEntity<List<NoteDTO>> response = restTemplate.exchange(
        createURLWithPort(NOTE_CATEGORY_FILTER+"test"),
        HttpMethod.GET, new HttpEntity<>(headers),
        new ParameterizedTypeReference<List<NoteDTO>>() {});
    assertNotNull(response.getBody());
    assertEquals(response.getBody().size(),0);
  }

}