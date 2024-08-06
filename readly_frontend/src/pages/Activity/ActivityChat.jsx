import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

let stompClient = null;

const ActivityChat = () => {
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    if (isConnected && currentRoomId) {
      stompClient.subscribe(`/topic/messages/${currentRoomId}`, (message) => {
        if (!isHistoryLoading) {
          showMessage(JSON.parse(message.body));
        }
      });

      fetchHistory(currentRoomId);
    }
  }, [isConnected, currentRoomId]);

  const connect = () => {
    if (!roomId) {
      alert('Please enter a Room ID.');
      return;
    }

    setCurrentRoomId(roomId);

    stompClient = new Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
    });

    stompClient.onConnect = (frame) => {
      setIsConnected(true);
      console.log('Connected: ' + frame);
    };

    stompClient.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stompClient.activate();
  };

  const fetchHistory = async (roomId) => {
    try {
      setIsHistoryLoading(true);
      const response = await axios.get(`http://localhost:8080/history/${roomId}`);
      const fetchedMessages = Array.isArray(response.data) ? response.data : [];
      showHistory(fetchedMessages);
      setIsHistoryLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setIsHistoryLoading(false);
    }
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.deactivate();
    }
    setIsConnected(false);
    console.log('Disconnected');
  };

  const sendMessage = () => {
    if (stompClient !== null && message.trim() !== '') {
      stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify({
          roomId: currentRoomId,
          from: name,
          content: message,
        }),
      });
      setMessage('');
    }
  };

  const showMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const showHistory = (messages) => {
    setMessages(messages);
  };

  return (
    <div className="container" id="main-content">
      <noscript>
        <h2 style={{ color: '#ff0000' }}>
          Seems your browser  support Javascript! Websocket relies on
          Javascript being enabled. Please enable Javascript and reload this
          page!
        </h2>
      </noscript>
      <div className="row">
        <div className="col-md-6">
          <form
            className="form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              isConnected ? disconnect() : connect();
            }}
          >
            <div className="form-group">
              <label htmlFor="connect">WebSocket connection:</label>
              <button
                id="connect"
                className="btn btn-default"
                type="submit"
                disabled={isConnected}
              >
                Connect
              </button>
              <button
                id="disconnect"
                className="btn btn-default"
                type="submit"
                disabled={!isConnected}
              >
                Disconnect
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form
            className="form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <div className="form-group">
              <label htmlFor="roomId">Room ID:</label>
              <input
                type="text"
                id="roomId"
                className="form-control"
                placeholder="Room ID here..."
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <input
                type="text"
                id="message"
                className="form-control"
                placeholder="Your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button id="send" className="btn btn-default" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
              <tr>
                <th>Messages</th>
              </tr>
            </thead>
            <tbody id="messages">
              {messages.map((msg, index) => (
                <tr key={index}>
                  <td>
                    <strong>{msg.from}:</strong> {msg.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityChat;
