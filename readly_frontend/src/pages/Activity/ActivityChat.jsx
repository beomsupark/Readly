import React, { useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import InfoImg from '../../assets/header/info_img.png'

export default function ActivityChat({groupData}) {
  // groupData에서 초기 메시지를 가져옵니다.
  const [messages, setMessages] = useState(groupData.messages || []);

  const handleSend = (message) => {
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