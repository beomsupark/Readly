package com.ssafy.readly.dto.member;

import com.ssafy.readly.enums.Gender;
import com.ssafy.readly.enums.Social;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class SignUpMemberRequest {
    private String loginId;
    private String loginPwd;
    private String nickname;
    private String memberName;
    private String phoneNumber;
    private String email;
    private LocalDate birthday;
    private Gender gender;
    private Social social = Social.R;
}
