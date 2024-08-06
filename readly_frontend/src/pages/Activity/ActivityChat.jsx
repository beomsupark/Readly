import { useState, useEffect, useRef } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import InfoImg from '../../assets/header/info_img.png';

export default function ActivityChat({ groupId }) {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ roomId: groupId })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data.map(msg => ({
          message: msg.content,
          direction: msg.from === 'self' ? 'outgoing' : 'incoming'
        })));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    if (groupId) {
      fetchMessages();
    }

    const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/messages/${groupId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [
          ...prevMessages,
          {
            message: receivedMessage.content,
            direction: receivedMessage.from === 'self' ? 'outgoing' : 'incoming'
          }
        ]);
      });

      stompClient.current.subscribe(`/topic/history/${groupId}`, (message) => {
        const receivedMessages = JSON.parse(message.body);
        setMessages(receivedMessages.map(msg => ({
          message: msg.content,
          direction: msg.from === 'self' ? 'outgoing' : 'incoming'
        })));
      });
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [groupId]);

  const handleSend = (message) => {
    const chatMessage = {
      roomId: groupId,
      from: 'self',
      content: message
    };

    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send('/app/chat', {}, JSON.stringify(chatMessage));
    }

    setMessages([...messages, {
      message: message,
      direction: 'outgoing',
      position: 'last'
    }]);
  };

  return (
    <MainContainer className="w-[30rem] h-[35rem] mt-5 mx-auto">
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => (
            <Message
              key={index}
              model={msg}
              avatarPosition="cl"
              avatarSpacer={false}
              className={msg.direction === 'incoming' ? 'pl-0' : ''}
            >
              {msg.direction === 'incoming' && (
                <>
                  <Avatar src={InfoImg} name="Info" className="ml-0" />
                  <Message.CustomContent className="ml-2">{msg.message}</Message.CustomContent>
                </>
              )}
            </Message>
          ))}
        </MessageList>
        <MessageInput placeholder="메세지 작성" onSend={handleSend} />
      </ChatContainer>
    </MainContainer>
  );
}
