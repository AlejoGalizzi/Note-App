import axios from "axios";

const token = localStorage.getItem("token");

export const getActiveNotes = () => {
  return axios.get("http://localhost:8080/notes", {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
};

export const getArchiveNotes = () => {
  return axios.get("http://localhost:8080/notes", {
    params: {
      isArchived: "true",
    },
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
};

export const getCategories = () => {
  return axios.get("http://localhost:8080/notes/categories", {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
};

export const getActiveNotesByCategoryName = (categoryName) => {
  return axios.get(
    `http://localhost:8080/notes/filter-by-category/${categoryName}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
};

export const getArchiveNotesByCategoryName = (categoryName) => {
  return axios.get(
    `http://localhost:8080/notes/filter-by-category/${categoryName}`,
    {
      params: {
        isArchived: "true",
      },
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
};

export const createNote = (formData) => {
  return axios.post("http://localhost:8080/notes", formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
};

export const updateNote = (formData, id) => {
  return axios.put(`http://localhost:8080/notes/${id}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
};

export const deleteNote = (id) => {
  return axios.delete(`http://localhost:8080/notes/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
    withCredentials: true,
  });
};

export const createCategory = (categoryName) => {
  return axios.post(
    "http://localhost:8080/notes/add-category",
    { name: categoryName },
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
};

export const changeStatus = (id) => {
  return axios.post(
    `http://localhost:8080/notes/change-status/${id}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    }
  );
};

export const logIn = (username, password) => {
  return axios.post(
    "http://localhost:8080/authenticate",
    { username, password },
    {
      withCredentials: true,
    }
  );
};

export const signUp = (username, password) => {
  return axios.post(
    "http://localhost:8080/register",
    { username, password },
    {
      withCredentials: true,
    }
  );
};
