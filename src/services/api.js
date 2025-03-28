import axios from "axios";
import { handleApiError } from "../helpers";

const API_URL = "https://reqres.in/api";

export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);

    console.log(response.data);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

export const fetchUsers = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/users?page=${page}`);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

export const updateUser = (id, formData) => {
  try {
    const response = axios.put(`${API_URL}/users/${id}`, formData);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};

export const deleteUser = (id) => {
  try {
    const response = axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (err) {
    return handleApiError(err);
  }
};
