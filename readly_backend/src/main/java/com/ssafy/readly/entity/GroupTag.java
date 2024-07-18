package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@Table(name="group_tags")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupTag {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
