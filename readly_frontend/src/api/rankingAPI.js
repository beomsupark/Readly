import axios from "axios";

const BASE_URL = 'https://i11c207.p.ssafy.io/api';

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

export const fetchUserGroupsRank = async (memberId) => {
  const response = await axios.get(`${BASE_URL}/rank-user-groups/${memberId}`);
  console.log("Fetch UserGroupsRank:", response.data);
  return response.data;
};