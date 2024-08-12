package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.*;
import com.ssafy.readly.entity.Member;

import javax.security.sasl.AuthenticationException;

public interface MemberService {

    Member getMemberEntity(int id);
    void singUp(SignUpMemberRequest signUpMember);
    void checkDuplicateId(String loginId);
    LoginMemberResponse login(LoginMemberRequest longinMember) throws AuthenticationException;
    void saveRefreshToken(int id, String refreshToken);
    String getRefreshToken(int id);
    void deleteRefreshToken(int id);
    MemberResponse getMember(int id);
    void updateMember(UpdateMemberRequest updateMember);
    Integer addPoint(int memberId, Integer point);
    MemberResponse getMemberbyLoginId(String loginid);
}
