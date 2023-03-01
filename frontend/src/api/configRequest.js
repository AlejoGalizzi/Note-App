import axios from "axios";

const token = localStorage.getItem("token");

const { REACT_APP_BACKEND_URL } = process.env;

const headers = {
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + token,
  },
}

export const getActiveNotes = () => {
  return axios.get(`${REACT_APP_BACKEND_URL}/notes`, headers);
};

export const getArchiveNotes = () => {
  return axios.get(`${REACT_APP_BACKEND_URL}/notes`, {
    ...headers,
    params: {
      isArchived: "true",
    }
  });
}

export const getCategories = () => {
  return axios.get(`${REACT_APP_BACKEND_URL}/notes/categories`, headers);
};

export const getActiveNotesByCategoryName = (categoryName) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/notes/filter-by-category/${categoryName}`,
    headers
  );
};

export const getArchiveNotesByCategoryName = (categoryName) => {
  return axios.get(
    `${REACT_APP_BACKEND_URL}/notes/filter-by-category/${categoryName}`,
    {
      ...headers,
      params: {
        isArchived: "true",
      }
    }
  );
};

export const createNote = (formData) => {
  return axios.post(`${REACT_APP_BACKEND_URL}/notes`, formData, headers);
};

export const updateNote = (formData, id) => {
  return axios.put(`${REACT_APP_BACKEND_URL}/notes/${id}`, formData, headers);
};

export const deleteNote = (id) => {
  return axios.delete(`${REACT_APP_BACKEND_URL}/notes/${id}`, headers);
};

export const createCategory = (categoryName) => {
  return axios.post(
    `${REACT_APP_BACKEND_URL}/notes/add-category`,
    { name: categoryName },
    headers
  );
};

export const changeStatus = (id) => {
  return axios.post(
    `${REACT_APP_BACKEND_URL}/notes/change-status/${id}`,
    {},
    headers
  );
};

export const logIn = (username, password) => {
  return axios.post(
    `${REACT_APP_BACKEND_URL}/authenticate`,
    { username, password },
    {
      withCredentials: true,
    }
  );
};

export const signUp = (username, password) => {
  return axios.post(
    `${REACT_APP_BACKEND_URL}/register`,
    { username, password },
    {
      withCredentials: true,
    }
  );
};

export const validateToken = (token) => {
  return axios.post(
    `${REACT_APP_BACKEND_URL}/validate-token`,
    {},
    {
      params: {
        token: token,
      },
      withCredentials: true,
    }
  );
};