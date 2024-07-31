import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const createPhotoCard = async (bookId, text, visibility, memberId) => {
  try {
    console.log('Sending data:', { bookId, text, visibility, memberId });  // 추가
    const response = await axios.post(`${BASE_URL}/photocard/createimage`, {
      bookId: bookId, 
      text: text,
      visibility: visibility,
      memberId: memberId
    });
    console.log('Received response:', response.data);  // 추가
    return response.data.CreatePhotoCardResponse;
  } catch (error) {
    console.error('Error creating photo card:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    throw error;
  }
};