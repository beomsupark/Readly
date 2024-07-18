package com.ssafy.readly.entity;

import com.ssafy.readly.dto.Gender;
import com.ssafy.readly.dto.Social;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name="members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue
    private int id;
    private String loginId;
    private String loginPwd;
    private String nickname;
    private String memberName;
    private String phoneNumber;
    private String email;
    private int point;
    private LocalDate birthday;
    private LocalDate joinDate;
    @Enumerated(value = EnumType.STRING)
    private Gender gender;
    @Enumerated(value = EnumType.STRING)
    private Social social;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<ReadedBook> readedbooks = new ArrayList<>();
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<PhotoCard> photoCards = new ArrayList<>();
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TimeCapsule> timeCapsules = new ArrayList<>();
    @OneToMany(mappedBy = "following",cascade = CascadeType.ALL)
    private List<Follower> followers = new ArrayList<>();
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<GroupMember> groupMembers = new ArrayList<>();
}
