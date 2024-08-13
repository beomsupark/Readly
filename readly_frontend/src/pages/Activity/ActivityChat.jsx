import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import useUserStore from '../../store/userStore';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { BASE_URL } from '../../api/authAPI';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

let stompClient = null;

const ActivityChat = ({ groupId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useUserStore(); // Access user data from the store

  useEffect(() => {
    if (groupId) {
      connect(groupId);
    }
    return () => {
      disconnect();
    };
  }, [groupId]);

  useEffect(() => {
    if (isConnected && groupId) {
      stompClient.subscribe(`/topic/messages/${groupId}`, (message) => {
        if (!isHistoryLoading) {
          showMessage(JSON.parse(message.body));
        }
      });

      fetchHistory(groupId);
    }
  }, [isConnected, groupId]);

  const connect = () => {
    stompClient = new Client({
      brokerURL: 'wss://i11c207.p.ssafy.io//gs-guide-websocket',
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
      const response = await axios.get(`${BASE_URL}/history/${roomId}`);
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
          roomId: groupId,
          from: user.nickname,
          content: message,
          avatar: user.avatar, // Assuming user avatar URL is stored in user.avatar
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
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.content,
                  sentTime: "just now",
                  sender: msg.from,
                  direction: msg.from === user.nickname ? "outgoing" : "incoming",
                  avatar: msg.avatar, // Include avatar in the message model
                }}
                avatarSpacer
              >
                <Avatar src={"https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"} name={user.nickname} />
              </Message>
            ))}
          </MessageList>
          <MessageInput 
            placeholder="Type message here" 
            value={message}
            onChange={(value) => setMessage(value)}
            onSend={() => sendMessage()}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ActivityChat;