package com.ssafy.readly.entity;

import com.ssafy.readly.dto.Gender;
import com.ssafy.readly.dto.Social;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Table(name="members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue
    private Long id;
    private String loginId;
    private String loginPwd;
    private String nickname;
    private String memberName;
    private String phoneNumber;
    @Enumerated(value = EnumType.STRING)
    private Gender gender;
    private String email;
    private LocalDate birthday;
    @Enumerated(value = EnumType.STRING)
    private Social social;
    private int point;
    private LocalDate joinDate;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<ReadedBook> readedbooks;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<PhotoCard> photoCards;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Review> reviews;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<TimeCapsule> timeCapsules;
    @OneToMany(mappedBy = "following",cascade = CascadeType.ALL)
    private List<Follower> followers;
    @OneToMany(mappedBy = "following",cascade = CascadeType.ALL)
    private List<GroupMember> groupMembers;
}
