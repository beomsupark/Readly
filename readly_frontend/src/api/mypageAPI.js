import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot 서버 주소

export const proceedingBooks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/proceeding-books/${userId}`);
    console.log(response);
    return response.data.proceedingBooks;
  } catch (error) {
    console.error('Error fetching proceeding books:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const readBooks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/read-books/${userId}`);
    console.log(response);
    return response.data.readBooks;
  } catch (error) {
    console.error('Error fetching read books:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getFollowers = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/followers/${userId}`);
    console.log(response);
    return response.data['my-followers'];
  } catch (error) {
    console.error('Error fetching followers:', error.response ? error.response.data : error.message);
    throw error;
  }
};