package com.ssafy.readly.entity;

import com.ssafy.readly.enums.IsInviting;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.EnumType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "small_groups")
@NoArgsConstructor(access = PROTECTED)
public class Group {

    @Id
    @GeneratedValue
    private int id;
    private String title;
    private String description;
    private LocalDateTime createdDate;
    @Enumerated(value = STRING)
    private IsInviting isInviting;

    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<BadDate> badDates = new ArrayList<>();
    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<MeetingDate> meetingDates = new ArrayList<>();
    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<GroupTag> groupTags = new ArrayList<>();
    @OneToMany(mappedBy = "group",cascade = CascadeType.ALL)
    private List<Proceeding> proceedings = new ArrayList<>();
}
