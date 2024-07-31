package com.ssafy.readly.dto.member;

import com.ssafy.readly.enums.Gender;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static jakarta.persistence.EnumType.STRING;

@Getter
@Builder
public class MemberResponse {

    private int id;
    private String loginId;
    private String nickname;
    private String memberName;
    private String phoneNumber;
    private String email;
    private int point;
    private LocalDate birthday;
    private LocalDateTime joinDate;
    @Enumerated(value = STRING)
    private Gender gender;
    private String introduction;
}
