// src/api/AuthAPI.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member/login`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (signUpData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/member/signup`, signUpData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/member/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};