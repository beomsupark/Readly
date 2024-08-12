import axios from 'axios';
import useUserStore from '../store/userStore';

const BASE_URL = 'https://i11c207.p.ssafy.io/api';

export const getReviews = async (searchType, orderType, pageSize, pageNumber) => {
  const token = useUserStore.getState().token;

  try {
    console.log("get review send:", {
      searchType,
      orderType,
      pageSize,
      pageNumber,
    });
    const response = await axios.post(`${BASE_URL}/review/getReviews`, 
      {
        searchType,
        orderType,
        pageSize,
        pageNumber: pageNumber
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Received reviews:', response.data);
    return response.data;  // 전체 응답을 반환
  } catch (error) {
    console.error('Error fetching reviews:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

export const postReview = async (memberId, bookId, text, visibility) => {
  console.log('Sending review data:', { memberId, bookId, text, visibility });
  const token = useUserStore.getState().token;  // 토큰 가져오기

  try {
    const response = await axios.post(`${BASE_URL}/review/addreview`, 
      {
        memberId,
        bookId,
        text,
        visibility: visibility ? 'A' : 'E'  // 'A'는 공개, 'E'는 비공개
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Server response:', response.data);
    
    if (response.data && response.data.message === 'success') {
      return { status: 'success', reviewId: response.data.reviewId };
    } else {
      return { status: 'fail', message: response.data.message || '알 수 없는 오류' };
    }
  } catch (error) {
    console.error('Error posting review:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
    return { status: 'error', message: error.response?.data?.message || '서버 오류' };
  }
};