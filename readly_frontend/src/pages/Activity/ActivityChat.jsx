import { useState, useEffect, useRef } from 'react';
import WebSocketClient from './services/websocket';
import { createMessageDto } from './services/messageDto';
import { fetchChatHistory } from './services/api';

const socketUrl = 'ws://localhost:8080/chat';
let webSocketClient = null; // WebSocketClient 인스턴스가 모든 컴포넌트에서 공유되도록

const App = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageListRef = useRef(null);

    useEffect(() => {
        if (!webSocketClient) {
            webSocketClient = new WebSocketClient(socketUrl);
        }

        const loadChatHistory = async () => {
            try {
                const history = await fetchChatHistory('7');
                setMessages(history);
                scrollToBottom();
            } catch (error) {
                console.error('Failed to load chat history:', error);
            }
        };

        const messageListener = (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
            scrollToBottom();
        };

        webSocketClient.addMessageListener(messageListener);

        loadChatHistory();

        return () => {
            webSocketClient.removeMessageListener(messageListener);
        };
    }, []);

    const scrollToBottom = () => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    };

    const sendMessage = () => {
        if (inputMessage.trim() === '') return;

        const message = createMessageDto(inputMessage, 'user1', '7');
        
        // 메시지를 로컬 상태에 추가하여 즉시 화면에 표시
        setMessages(prevMessages => [...prevMessages, message]);

        webSocketClient.send(message);
        setInputMessage('');
        scrollToBottom();
    };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll' }} ref={messageListRef}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;