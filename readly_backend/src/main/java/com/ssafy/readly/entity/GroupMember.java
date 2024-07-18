package com.ssafy.readly.entity;
import com.ssafy.readly.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="group_members")
@NoArgsConstructor(access = PROTECTED)
public class GroupMember {

    @Id
    @GeneratedValue
    private int id;
    @Enumerated(value = STRING)
    private Role role;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "group_id")
    private Group group;
}
