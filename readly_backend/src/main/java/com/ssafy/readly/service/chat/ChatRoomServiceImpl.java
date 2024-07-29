package com.ssafy.readly.service.chat;

import com.ssafy.readly.dto.chat.ChatMessage;
import com.ssafy.readly.repository.chat.ChatMessageRepository;
import com.ssafy.readly.repository.chat.ChatRoomRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService{


    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Override
    public String createChatRoom(String groupId) throws Exception {
        return  chatRoomRepository.createChatRoom(groupId);
    }

    @Override
    public List<ChatMessage> findAllMessages(String roomId) throws Exception{
        return chatMessageRepository.findAllMessages(roomId);
    }
}
