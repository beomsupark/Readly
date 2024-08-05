class WebSocketClient {
  constructor(url) {
      this.url = url;
      this.socket = new WebSocket(url);
      this.listeners = [];

      this.socket.onopen = () => {
          console.log('WebSocket connection established');
      };

      this.socket.onclose = () => {
          console.log('WebSocket connection closed');
      };

      this.socket.onerror = (error) => {
          console.log('WebSocket error', error);
      };

      this.socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log('Message received from server:', message); // 메시지 수신 로그 추가
          this.listeners.forEach(listener => listener(message));
      };
  }

  send(message) {
      console.log('Message sent to server:', message); // 메시지 전송 로그 추가
      this.socket.send(JSON.stringify(message));
  }

  addMessageListener(listener) {
      this.listeners.push(listener);
  }

  removeMessageListener(listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
  }
}

export default WebSocketClient;
