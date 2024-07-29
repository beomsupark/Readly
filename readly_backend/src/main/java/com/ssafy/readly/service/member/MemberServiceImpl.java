package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.repository.member.MemberRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.sasl.AuthenticationException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepositoryImpl memberRepository;

    @Transactional
    @Override
    public void singnUp(SignUpMemberRequest signUpMember) {
        checkDuplicateId(signUpMember.getLoginId());

        Member member = new Member(
                signUpMember.getLoginId(),
                signUpMember.getLoginPwd(),
                signUpMember.getNickname(),
                signUpMember.getMemberName(),
                signUpMember.getPhoneNumber(),
                signUpMember.getEmail(),
                signUpMember.getBirthday(),
                signUpMember.getGender(),
                signUpMember.getSocial());

        memberRepository.signUp(member);
    }

    @Override
    public void login(LoginMemberRequest longinMember) throws AuthenticationException {
        Long islogin = memberRepository.login(longinMember);
        if (islogin == 0) {
            throw new AuthenticationException("아이디 또는 비밀번호를 확인해주세요.");
        }
    }

    @Override
    public void logout(String userId) {

    }

    @Override
    public Member getMember(String loginId) {
        Optional<Member> findMember = memberRepository.findByLoginId(loginId);
        return findMember.orElseThrow(() -> new NoSuchElementException("해당 회원이 존재하지 않습니다."));
    }

    @Override
    public void checkDuplicateId(String loginId) {
        try {
            getMember(loginId);
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        } catch (NoSuchElementException n) {

        }
    }

    @Override
    public String checkMember(FindMemberRequest findMember) {
        return "";
    }

}
