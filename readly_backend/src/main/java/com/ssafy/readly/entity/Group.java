package com.ssafy.readly.entity;

import com.ssafy.readly.dto.IsInviting;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name="groups")
@NoArgsConstructor(access = PROTECTED)
public class Group {

    @Id
    @GeneratedValue
    private long id;
    private LocalDate createdDate;
    private String title;
    @Enumerated(value = EnumType.STRING)
    private IsInviting isInviting;
    @OneToOne(fetch = LAZY)
    private Member member;
    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<BadDate> badDates;
    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<MeetingDate> meetingDates;
}
