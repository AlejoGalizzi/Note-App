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

export const changeStatus = (id) => {
  return axios.post(`http://localhost:8080/notes/change-status/${id}`, {});
}