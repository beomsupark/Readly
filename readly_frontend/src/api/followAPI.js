import axios from 'axios';
import useUserStore from '../store/userStore';

const BASE_URL = 'https://i11c207.p.ssafy.io/api';

export const addFollower = async (memberId, followerMemberId) => {
  const token = useUserStore.getState().token;

  try {
    console.log("Adding follower:", { memberId, followerMemberId });
    const response = await axios.post(`${BASE_URL}/follower`,
      {
        memberId,
        followerMemberId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Follower added successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding follower:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};

export const removeFollower = async (memberId, followerMemberId) => {
  const token = useUserStore.getState().token;

  try {
    console.log("Removing follower:", { memberId, followerMemberId });
    const response = await axios.delete(`${BASE_URL}/follower`,
      {
        data: {
          memberId,
          followerMemberId
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log('Follower removed successfully');
    return response.data;
  } catch (error) {
    console.error('Error removing follower:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};