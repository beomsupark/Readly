package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMember;
import com.ssafy.readly.dto.member.LoginMember;
import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.repository.member.MemberRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepositoryImpl memberRepository;

    @Transactional
    @Override
    public void singnUp(SignUpMemberRequest signUpMember) {
        Member member = new com.ssafy.readly.entity.Member(signUpMember.getLoginId(), signUpMember.getLoginPwd(), signUpMember.getNickname(), signUpMember.getMemberName(), signUpMember.getPhoneNumber(), signUpMember.getEmail(), signUpMember.getBirthday(), signUpMember.getGender(), signUpMember.getSocial());
        memberRepository.signUp(member);
    }

    @Override
    public void login(LoginMember longinMember) {

    }

    @Override
    public void logout(String userId) {

    }

    @Override
    public int CheckDuplicate(String userId) {
        return 0;
    }

    @Override
    public String findId(FindMember findMember) {
        return "";
    }

    @Override
    public int findPwd(FindMember findMember) {
        return 0;
    }
}
