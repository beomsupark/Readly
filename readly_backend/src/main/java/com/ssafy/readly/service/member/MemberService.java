package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMember;
import com.ssafy.readly.dto.member.LoginMember;
import com.ssafy.readly.dto.member.SignUpMemberRequest;

public interface MemberService {

    public abstract void singnUp(SignUpMemberRequest signUpMember);

    public abstract void login(LoginMember longinMember);

    public abstract void logout(String userId);

    public abstract void checkDuplicateId(String loginId);

    public abstract String checkMember(FindMember findMember);

}
