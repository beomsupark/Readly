import axios from 'axios';
import useUserStore from '../store/userStore';  // 경로는 실제 위치에 맞게 조정하세요

const BASE_URL = 'http://localhost:8080/api';

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
