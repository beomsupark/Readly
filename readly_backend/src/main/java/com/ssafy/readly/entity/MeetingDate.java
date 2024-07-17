package com.ssafy.readly.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@Table(name="meeting_dates")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingDate {

    @Id
    @GeneratedValue
    private Long id;
    private LocalDate meetingDate;

}
