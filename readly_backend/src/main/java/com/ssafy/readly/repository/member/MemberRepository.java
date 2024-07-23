package com.ssafy.readly.repository.member;

import com.ssafy.readly.dto.member.FindMember;
import com.ssafy.readly.dto.member.LoginMember;
import com.ssafy.readly.entity.Member;

import java.util.List;

public interface MemberRepository {

    public abstract void signUp(Member member);

    public abstract void login(LoginMember longinMember);

    public abstract void logout(String userId);

    public abstract long findById(String loginId);

    public abstract String checkMember(FindMember findMember);

}