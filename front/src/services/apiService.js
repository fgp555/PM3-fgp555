import axios from "axios";

// const API_URL = "http://localhost:3000";
// const API_URL = "https://1rodemayo.com";
const API_URL = "https://back.fgp.one";

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/users/login`, data);
  return response.data;
};

export const fetchUserData = async (userID) => {
  const response = await axios.get(`${API_URL}/users/${userID}`);
  return response.data;
};

export const cancelTurn = async (turnId) => {
  const response = await axios.put(`${API_URL}/turns/cancel/${turnId}`);
  return response.data;
};

export const createTurn = async (turnData) => {
  const response = await axios.post(`${API_URL}/turns/schedule/`, turnData);
  return response.data;
};

export const fetchTurnDetails = async (turnId) => {
  const response = await axios.get(`${API_URL}/turns/${turnId}`);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register/`, userData);
  return response.data;
};
