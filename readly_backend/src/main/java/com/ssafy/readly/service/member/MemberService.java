package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.entity.Member;

import javax.security.sasl.AuthenticationException;

public interface MemberService {

    public abstract void singnUp(SignUpMemberRequest signUpMember);

    public abstract void login(LoginMemberRequest longinMember) throws AuthenticationException;

    public abstract void logout(String userId);

    public abstract Member getMember(String loginId);

    public abstract void checkDuplicateId(String loginId);

    public abstract String checkMember(FindMemberRequest findMember);

}
