import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot 서버 주소

// 타임캡슐 생성 (아이템 조회)
export const getTimeCapsuleItems = async (memberId, startDate, endDate) => {
  try {
    const response = await axios.post(`${BASE_URL}/items/date`, {
      memberId,
      startDate,
      endDate
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching time capsule items:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 타임캡슐 제작
export const createTimeCapsule = async (memberId, startDate, endDate, reviewIds, photoCardIds) => {
  try {
    const response = await axios.post(`${BASE_URL}/timecapsule`, {
      memberId,
      startDate,
      endDate,
      reviewIds,
      photoCardIds
    });
    console.log(response);
    // 응답이 없다고 명세서에 나와있지만, 성공 여부를 알기 위해 상태 코드를 반환
    return response.status === 200;
  } catch (error) {
    console.error('Error creating time capsule:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// 타임캡슐 개봉
export const openTimeCapsule = async (timecapsuleid) => {
  try {
    const response = await axios.get(`${BASE_URL}/timecapsule/${timecapsuleid}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error opening time capsule:', error.response ? error.response.data : error.message);
    throw error;
  }
};