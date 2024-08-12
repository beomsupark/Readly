import axios from 'axios';
import useUserStore from '../store/userStore';

const BASE_URL = 'https://i11c207.p.ssafy.io/api';

export const addLike = async (memberId, reviewId = null, photoCardId = null) => {
  const token = useUserStore.getState().token;

  try {
    console.log("Adding like:", { memberId, reviewId, photoCardId });
    const response = await axios.post(`${BASE_URL}/like`,
      {
        memberId,
        reviewId,
        photoCardId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Like added successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding like:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

export const removeLike = async (memberId, reviewId = null, photoCardId = null) => {
  const token = useUserStore.getState().token;

  try {
    console.log("Removing like:", { memberId, reviewId, photoCardId });
    const response = await axios.delete(`${BASE_URL}/like`,
      {
        data: {
          memberId,
          reviewId,
          photoCardId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Like removed successfully');
    return response.data;
  } catch (error) {
    console.error('Error removing like:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};


