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

// 내가 만든 리뷰 조회 함수
export const getMyReviews = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/reviews/${userId}`);
    console.log(response);
    return response.data['my-reviews'];
  } catch (error) {
    console.error('Error fetching my reviews:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 내가 만든 포토카드 조회 함수
export const getMyPhotocards = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/photocards/${userId}`);
    console.log(response);
    return response.data['my-photocards'];
  } catch (error) {
    console.error('Error fetching my photocards:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 책을 read_books에 추가하는 함수
export const addBookToReadBooks = async (userId, bookId) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/add`, {
      userId,
      bookId
    });
    return response.data;
  } catch (error) {
    console.error('Error adding book to read books:', error.response?.data || error.message);
    throw error;
  }
};
