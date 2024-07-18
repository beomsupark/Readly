package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="meeting_dates")
@NoArgsConstructor(access = PROTECTED)
public class MeetingDate {

    @Id
    @GeneratedValue
    private int id;
    private LocalDate meetingDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="group_id")
    private Group group;
}
