package com.ssafy.readly.entity;

import com.ssafy.readly.enums.IsInviting;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "small_groups")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "room_id")
    private String roomId;
    @Enumerated(value = EnumType.STRING)
    @Column(name = "is_inviting")
    private IsInviting isInviting;
    @Column(name = "max_participants", nullable = false)
    private int maxParticipants;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<BadDate> badDates = new ArrayList<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<MeetingDate> meetingDates = new ArrayList<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<GroupTag> groupTags = new HashSet<>();

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Proceeding> proceedings = new ArrayList<>();

    public Group(String title, String description, LocalDateTime createdDate, int maxParticipants, String roomId, IsInviting isInviting) {
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.maxParticipants = maxParticipants;
        this.isInviting = isInviting;
        this.roomId = roomId;
    }

    public void updateRoomId(String newRoomId) {
        this.roomId = newRoomId;
    }

    public void addGroupTag(GroupTag groupTag) {
        groupTags.add(groupTag);
        groupTag.setGroup(this); // 이 메서드는 bidirectional consistency를 보장합니다.
    }

    public void removeGroupTag(GroupTag groupTag) {
        groupTags.remove(groupTag);
        groupTag.setGroup(null); // 이 메서드는 bidirectional consistency를 보장합니다.
    }

}