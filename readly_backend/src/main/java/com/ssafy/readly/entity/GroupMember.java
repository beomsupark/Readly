package com.ssafy.readly.entity;
import com.ssafy.readly.entity.common.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="group_members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupMember {

    @Id
    @GeneratedValue
    private int id;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "group_id")
    private Group group;
}
