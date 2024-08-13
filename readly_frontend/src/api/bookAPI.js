import axios from 'axios';

const BASE_URL = 'https://i11c207.p.ssafy.io/api';

export const fetchBooks = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/book/searchBooks`);
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error.response ? error.response.data : error.message);
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

export const fetchBookDetails = async (bookId) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/search`, {
      params: { id: bookId }
    });
    console.log('전송전송', bookId)
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error.response ? error.response.data : error.message);
    throw error;
  }
};