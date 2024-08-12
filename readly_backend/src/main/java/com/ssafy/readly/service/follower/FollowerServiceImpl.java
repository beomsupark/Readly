package com.ssafy.readly.service.follower;

import com.ssafy.readly.dto.follower.RequestFollowerDto;
import com.ssafy.readly.repository.follower.FollowerRepository;
import com.ssafy.readly.repository.notification.NotificationRepository;
import com.ssafy.readly.service.notification.NotificationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowerServiceImpl implements FollowerService {

    private final FollowerRepository followerRepository;
    private final NotificationService notificationService;

    @Override
    public void addFollower(RequestFollowerDto requestFollowerDto) throws Exception {
        followerRepository.addFollower(requestFollowerDto);

        // 팔로우된 사용자에게 알림 전송
        String message = requestFollowerDto.getMemberId() + "님이 당신을 팔로우했습니다.";

        notificationService.sendNotification(requestFollowerDto.getFollowerMemberId(), message);
    }

    @Override
    public void deleteFollower(RequestFollowerDto requestFollowerDto) throws Exception {
        followerRepository.deleteFollower(requestFollowerDto);

        // (선택적) 팔로우 취소 시에도 알림 전송 가능
        String message = requestFollowerDto.getMemberId() + "님이 당신을 언팔로우했습니다.";
        notificationService.sendNotification(requestFollowerDto.getFollowerMemberId(), message);
    }
}
