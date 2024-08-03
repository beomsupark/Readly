package com.ssafy.readly.scheduler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.querydsl.core.Tuple;
import com.ssafy.readly.repository.timecapsule.TimeCapsuleRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Component
@RequiredArgsConstructor
public class TimeCapsuleScheduler {

    private final TimeCapsuleRepositoryImpl timeCapsuleRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Scheduled(cron = "0 0 6 * * ?")
    public void sendNotification() throws JsonProcessingException {
        List<Tuple> timeCapsuleTuple = timeCapsuleRepository.findTimeCapsuleByDate(LocalDate.now());

        for(Tuple timeCapsule : timeCapsuleTuple) {
            Integer timeCapsuleId = timeCapsule.get(0, Integer.class);
            Integer memberId = timeCapsule.get(1, Integer.class);
            LocalDate createdDate = timeCapsule.get(2, LocalDate.class);
            Period period = Period.between(createdDate, LocalDate.now());

            String message = period.getMonths() + "달 전에 만든 타임캡슐이 도착했습니다.";

            NotificationMessage notificationMessage = new NotificationMessage(memberId, timeCapsuleId, message);
            messagingTemplate.convertAndSend("/timecapsule/notification/" + memberId, notificationMessage);
        }
    }
}
