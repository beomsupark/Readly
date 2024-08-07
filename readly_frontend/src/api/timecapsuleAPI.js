import axios from 'axios';
import useUserStore from '../store/userStore';

const BASE_URL = 'http://localhost:8080/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});

export const fetchTimeCapsuleItems = async (memberId, startDate, endDate) => {
  const { token } = useUserStore.getState();
  
  if (!memberId || !startDate || !endDate) {
    throw new Error('Missing required parameters: memberId, startDate, or endDate');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/items/date`, 
      { memberId, startDate, endDate },
      { headers: getHeaders(token) }
    );
    console.log('Fetched time capsule items:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching time capsule items:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export async function createTimeCapsule(memberId, startDate, endDate, selectedReviews, selectedPhotoCards) {
  const { token } = useUserStore.getState();
  
  try {
    const payload = {
      memberId,
      startDate,
      endDate,
      reviewIds: selectedReviews,
      photoCardIds: selectedPhotoCards
    };

    console.log('Sending payload for time capsule creation:', payload);

    const response = await axios.post(`${BASE_URL}/timecapsule`, payload, { 
      headers: getHeaders(token) 
    });
    
    console.log('Time capsule creation response:', response.data);

    if (response.data.success) {
      return true;
    } else {
      throw new Error(response.data.message || "타임캡슐 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("Error creating time capsule:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export const openTimeCapsule = async (timeCapsuleId) => {
  const { token } = useUserStore.getState();
  
  if (!timeCapsuleId) {
    throw new Error('Missing required parameter: timeCapsuleId');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/timecapsule/${timeCapsuleId}`,
      { headers: getHeaders(token) }
    );
    console.log('Opened time capsule:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error opening time capsule:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getTimeCapsuleItems = async (memberId, startDate, endDate) => {
  const { token } = useUserStore.getState();
  
  try {
    const response = await axios.post(`${BASE_URL}/items/date`, {
      memberId,
      startDate,
      endDate
    }, { headers: getHeaders(token) });
    
    console.log('Retrieved time capsule items:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching time capsule items:', error.response ? error.response.data : error.message);
    throw error;
  }
};