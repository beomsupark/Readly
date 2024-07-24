package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.dto.member.SignUpMemberRequest;

public interface MemberService {

    public abstract void singnUp(SignUpMemberRequest signUpMember);

    public abstract void login(LoginMemberRequest longinMember);

    public abstract void logout(String userId);

    public abstract void checkDuplicateId(String loginId);

    public abstract String checkMember(FindMemberRequest findMember);

}
