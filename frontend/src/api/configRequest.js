import axios from "axios";

export const getActiveNotes = () => {
  return axios.get("http://localhost:8080/notes");
}

export const getArchiveNotes = () => {
  return axios.get("http://localhost:8080/notes", {
    params: {
      isArchived: "true"
    }
  });
}

export const getCategories = () => {
  return axios.get("http://localhost:8080/notes/categories")
}

export const getActiveNotesByCategoryName = (categoryName) => {
  return axios.get(`http://localhost:8080/notes/filter-by-category/${categoryName}`)
}

export const getArchiveNotesByCategoryName = (categoryName) => {
  return axios.get(`http://localhost:8080/notes/filter-by-category/${categoryName}`, {
    params: {
      isArchived: "true"
    }
  })
}

export const createNote = (formData) => {
  return axios.post("http://localhost:8080/notes", formData);
}

export const updateNote = (formData,id) => {
  return axios.put(`http://localhost:8080/notes/${id}`, formData);
}

export const deleteNote = (id) => {
  return axios.delete(`http://localhost:8080/notes/${id}`);
}

export const createCategory = (categoryName) => {
  return axios.post("http://localhost:8080/notes/add-category", {"name": categoryName})
}

export const changeStatus = (id) => {
  return axios.post(`http://localhost:8080/notes/change-status/${id}`, {});
}