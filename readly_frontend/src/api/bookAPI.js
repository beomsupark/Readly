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

export const fetchBookDetailsWithPhotoAndReview = async (bookId) => {
  try {
    console.log('전송한다', bookId)
    const response = await axios.get(`${BASE_URL}/book/searchBook/${bookId}`);
    console.log('받는다', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching book details with photo and review:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addBookToUser = async (memberId, bookId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/add`, { memberId, bookId });
    return response.data;
  } catch (error) {
    console.error('Error adding book to user:', error);
    throw error;
  }
};