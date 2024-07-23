package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMember;
import com.ssafy.readly.dto.member.LoginMember;
import com.ssafy.readly.dto.member.SignUpMemberRequest;

public interface MemberService {

    public abstract void singnUp(SignUpMemberRequest signUpMember);

    public abstract void login(LoginMember longinMember);

    public abstract void logout(String userId);

    public abstract int CheckDuplicate(String userId);

    public abstract String findId(FindMember findMember);

    public abstract int findPwd(FindMember findMember);
}
