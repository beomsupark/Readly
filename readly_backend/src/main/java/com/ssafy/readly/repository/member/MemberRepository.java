package com.ssafy.readly.repository.member;

import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberResponse;
import com.ssafy.readly.dto.member.UpdateMemberRequest;
import com.ssafy.readly.entity.Member;

import java.util.Optional;

public interface MemberRepository {

    void signUp(Member member);
    Optional<LoginMemberResponse> login(LoginMemberRequest longinMember);
    Optional<String> findByToken(int id);
    Optional<Member> findById(int id);
    Long findByLoginId(String loginId);
    void updateMember(UpdateMemberRequest UpdateMember);
}