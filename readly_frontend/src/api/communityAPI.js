// src/api/communityAPI.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const joinGroup = async (groupId, memberId, token) => {
  console.log(`Attempting to join group. GroupID: ${groupId}, MemberID: ${memberId}`);
  try {
    const response = await axios.post(`${BASE_URL}/joingroup`, {
      groupId,
      memberId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Full API response:', response);
    // 응답 상태 코드를 반환
    return response.status;
  } catch (error) {
    console.error('Error joining group:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createGroup = async (groupData) => {
  try {
    console.log("Sending group data:", groupData);
    const response = await axios.post(`${BASE_URL}/makegroup`, groupData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log("Server response:", response);
    return response.status;
  } catch (error) {
    console.error('Error creating group:', error.response ? error.response.data : error.message);
    throw error;
  }
};