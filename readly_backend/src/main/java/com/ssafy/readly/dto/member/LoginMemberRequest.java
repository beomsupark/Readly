package com.ssafy.readly.dto.member;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginMemberRequest {
    @NotBlank
    private String loginId;
    @NotBlank
    private String loginPwd;
}
