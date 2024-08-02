import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchPersonalRanking = async () => {
  const response = await axios.get(`${BASE_URL}/rank-user`);
  console.log("Fetch PersonalRank:", response.data);
  return response.data;
};

export const fetchGroupRanking = async () => {
  const response = await axios.get(`${BASE_URL}/rank-group`);
  console.log("Fetch GroupRank:", response.data);
  return response.data;
};

export const fetchUserSpecificRank = async (memberId) => {
  const response = await axios.get(`${BASE_URL}/rank-user-specific/${memberId}`);
  console.log("Fetch UserSpecificRank:", response.data);
  return response.data;
};