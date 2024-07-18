package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="group_tags")
@NoArgsConstructor(access = PROTECTED)
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

    /* 연관 관계 편의 메소드 */
    public void setGroup(Group group){
        if (this.group != null) {
            this.group.getGroupTags().remove(this);
        }

        this.group = group;
        group.getGroupTags().add(this);
    }
}
