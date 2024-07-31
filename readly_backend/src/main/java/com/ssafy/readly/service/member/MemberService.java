package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.*;

import javax.security.sasl.AuthenticationException;

public interface MemberService {

    public abstract void singnUp(SignUpMemberRequest signUpMember);

    public abstract void checkDuplicateId(String loginId);

    public abstract LoginMemberResponse login(LoginMemberRequest longinMember);

    public abstract void saveRefreshToken(int id, String refreshToken);

    public abstract Object getRefreshToken(int id);

    public abstract void deleteRefreshToken(int id);

    public abstract MemberResponse getMember(int id);

    public abstract void updateMember(UpdateMemberRequest updateMember);

    public abstract String checkMember(FindMemberRequest findMember);

}
