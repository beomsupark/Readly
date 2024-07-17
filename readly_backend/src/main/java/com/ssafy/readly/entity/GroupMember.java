package com.ssafy.readly.entity;
import jakarta.persistence.*;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name="group_members")
public class GroupMember {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;
    @ManyToOne(fetch = LAZY)
    private Group group;
}
