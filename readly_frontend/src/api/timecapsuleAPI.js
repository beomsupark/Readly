import axios from 'axios';
import useUserStore from '../store/userStore';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot 서버 주소

// 타임캡슐 생성 (아이템 조회)
export const getTimeCapsuleItems = async (memberId, startDate, endDate) => {
  const { token } = useUserStore.getState();
  
  try {
    const response = await axios.post(`${BASE_URL}/items/date`, {
      memberId,
      startDate,
      endDate
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching time capsule items:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 타임캡슐 제작
export const createTimeCapsule = async (memberId, startDate, endDate, reviewIds, photoCardIds) => {
  const { token, user } = useUserStore.getState();

  if (!user || !user.memberId) {
    throw new Error('User is not logged in or memberId is missing');
  }

  try {
    const response = await axios.post(`${BASE_URL}/timecapsule`, {
      memberId: user.memberId,
      startDate,
      endDate,
      reviewIds,
      photoCardIds
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.status === 200;
  } catch (error) {
    console.error('Error creating time capsule:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 타임캡슐 개봉
export const openTimeCapsule = async (timecapsuleid) => {
  const { token } = useUserStore.getState();

  try {
    const response = await axios.get(`${BASE_URL}/timecapsule/${timecapsuleid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error opening time capsule:', error.response ? error.response.data : error.message);
    throw error;
  }
};