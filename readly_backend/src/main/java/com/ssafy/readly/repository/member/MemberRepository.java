package com.ssafy.readly.repository.member;

import com.ssafy.readly.dto.member.FindMember;
import com.ssafy.readly.dto.member.LoginMember;
import com.ssafy.readly.entity.Member;

public interface MemberRepository {

    public abstract void signUp(Member member);

    public abstract void login(LoginMember longinMember);

    public abstract void logout(String userId);

    public abstract int CheckDuplicate(String userId);

    public abstract String findId(FindMember findMember);

    public abstract int findPwd(FindMember findMember);
}