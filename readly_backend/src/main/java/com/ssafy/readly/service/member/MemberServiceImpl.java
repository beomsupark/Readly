package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
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
    public void login(LoginMemberRequest longinMember) {

    }

    @Override
    public void logout(String userId) {

    }

    @Override
    public void checkDuplicateId(String loginId) {
        Long findId = memberRepository.findByLoginId(loginId);
        if(findId != 0) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    @Override
    public String checkMember(FindMemberRequest findMember) {
        return "";
    }

}
