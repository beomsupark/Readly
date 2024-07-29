package com.ssafy.readly.dto.member;

import com.ssafy.readly.enums.Gender;
import com.ssafy.readly.enums.Social;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class SignUpMemberRequest {
    @NotBlank
    private String loginId;
    @NotBlank
    private String loginPwd;
    @NotEmpty
    private String nickname;
    @NotBlank
    private String memberName;
    @NotBlank
    private String phoneNumber;
    @Email @NotBlank
    private String email;
    private LocalDate birthday;
    private Gender gender;
    private Social social = Social.R;
    private String text;

    @Builder
    public SignUpMemberRequest(String loginId, String loginPwd, String nickname, String memberName, String phoneNumber, String email, LocalDate birthday, Gender gender, Social social, String text) {
        this.loginId = loginId;
        this.loginPwd = loginPwd;
        this.nickname = nickname;
        this.memberName = memberName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.birthday = birthday;
        this.gender = gender;
        if(social != null) {
            this.social = social;
        }
        this.text = text;
    }
}
