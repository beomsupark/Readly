import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getFollowerInfo = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/follower`, {
      params: { memberId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching follower info:', error.response ? error.response.data : error.message);
    throw error;
  }
};