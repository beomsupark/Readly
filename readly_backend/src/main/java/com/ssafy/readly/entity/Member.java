package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Table(name="Members")
public class Member {

    @Id
    @GeneratedValue
    private Long id;
    private String loginId;
    private String loginPwd;
    private String nickname;
    private String memberName;
    private String phoneNumber;
    private String gender;
    private String email;
    private LocalDate birthday;
    private int point;
    private LocalDate joinDate;
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    List<ReadedBook> readedbooks;

}
