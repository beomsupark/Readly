package com.ssafy.readly.scheduler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class NotificationMessage {
    private Integer timeCapsuleId;
    private String message;
}
