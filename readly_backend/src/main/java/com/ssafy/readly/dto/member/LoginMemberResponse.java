package com.ssafy.readly.dto.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginMemberResponse {
    private int id;
    private String nickname;
    private int point;
    private String introduction;
}
