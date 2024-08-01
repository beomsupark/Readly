package com.ssafy.readly.dto.timecapsule;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class CardsRequest {

    private int memberId;
    private LocalDate startDate;
    private LocalDate endDate;
}
