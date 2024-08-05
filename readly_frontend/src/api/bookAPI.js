import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot 서버 주소

export const fetchBooks = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/book/searchBooks`);
    // console.log("Full response:", response); // 전체 응답 로깅
    return response.data.books;
  } catch (error) {
    console.error('Error fetching books:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const searchBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/book/searchBooksByTitle/${title}`);
    console.log('Search results:', response.data.books);
    return response.data.books.map(book => ({
      ...book,
      id: book.ItemId || book.id || Math.random().toString(36).substr(2, 9) // ItemId나 id가 없으면 임의의 id 생성
    }));
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};