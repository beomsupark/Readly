
export const fetchChatHistory = async (roomId) => {
  try {
      const response = await fetch(`http://localhost:8080/api/redis/pubsub/history?roomId=${roomId}`);
      if (!response.ok) {
          throw new Error(`Failed to fetch chat history: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
  }
};
