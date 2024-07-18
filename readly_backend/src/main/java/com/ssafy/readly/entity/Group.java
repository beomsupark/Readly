package com.ssafy.readly.entity;

import com.ssafy.readly.dto.IsInviting;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name="groups")
@NoArgsConstructor(access = PROTECTED)
public class Group {

    @Id
    @GeneratedValue
    private int id;
    private String title;
    private String description;
    private LocalDate createdDate;
    @Enumerated(value = EnumType.STRING)
    private IsInviting isInviting;

    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<BadDate> badDates = new ArrayList<>();
    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<MeetingDate> meetingDates = new ArrayList<>();
}
