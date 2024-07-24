package com.ssafy.readly.repository.member;

import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.entity.Member;

public interface MemberRepository {

    public abstract void signUp(Member member);

    public abstract void login(LoginMemberRequest longinMember);

    public abstract void logout(String userId);

    public abstract Long findByLoginId(String loginId);

    public abstract String checkMember(FindMemberRequest findMember);

}