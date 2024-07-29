import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Spring Boot 서버 주소

export const fetchBooks = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/book/searchBooks`);
    console.log(response)
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const searchBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/book/searchBooksByTitle/${title}`);
    return response.data.books;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};