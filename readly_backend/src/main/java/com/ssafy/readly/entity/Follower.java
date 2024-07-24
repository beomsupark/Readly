package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name = "followers")
@NoArgsConstructor(access = PROTECTED)
public class Follower {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "following_id")
    private Member following;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "followed_id")
    private Member followed;

    /* 연관 관계 편의 메소드 */
    public void setMember(Member member){
        if (this.following != null) {
            this.following.getFollowers().remove(this);
        }

        this.following = member;
        member.getFollowers().add(this);
    }
}
