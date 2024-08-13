package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.*;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.security.sasl.AuthenticationException;
import java.util.NoSuchElementException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member getMemberEntity(int id) {
        return memberRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("해당 회원은 존재하지 않습니다."));
    }

    @Transactional
    @Override
    public void signUp(SignUpMemberRequest signUpMember) {
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
    public void checkDuplicateId(String loginId) {
        long loginIdCount = memberRepository.findByLoginId(loginId);
        if (loginIdCount != 0) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    @Override
    public LoginMemberResponse login(LoginMemberRequest longinMember) throws AuthenticationException {
        return memberRepository.login(longinMember).orElseThrow(
                () -> new AuthenticationException("아이디 또는 비밀번호를 확인해주세요."));
    }

    @Transactional
    @Override
    public void saveRefreshToken(int id, String refreshToken) {
        getMemberEntity(id).addToken(refreshToken);
    }

    @Override
    public String getRefreshToken(int id) {
        return memberRepository.findByToken(id).orElseThrow(
                () -> new NoSuchElementException("리프레쉬 토큰이 존재하지 않습니다."));
    }

    @Transactional
    @Override
    public void deleteRefreshToken(int id) {
        getMemberEntity(id).deleteToken();
    }

    @Override
    public MemberResponse getMember(int id) {
        Member member = getMemberEntity(id);
        return new MemberResponse(
                member.getId(),
                member.getLoginId(),
                member.getNickname(),
                member.getMemberName(),
                member.getPhoneNumber(),
                member.getEmail(),
                member.getPoint(),
                member.getBirthday(),
                member.getJoinDate(),
                member.getGender(),
                member.getIntroduction());
    }

    @Transactional
    @Override
    public void updateMember(UpdateMemberRequest updateMember) {
        Member findMember = getMemberEntity(updateMember.getId());

        findMember.changeMember(
                updateMember.getNickname(),
                updateMember.getMemberName(),
                updateMember.getPhoneNumber(),
                updateMember.getEmail(),
                updateMember.getBirthDate(),
                updateMember.getGender(),
                updateMember.getIntroduction());
    }

    @Transactional
    @Override
    public Integer addPoint(int memberId, Integer point) {
        Member member = getMemberEntity(memberId);
        member.addPoint(point);
        return member.getPoint();
    }

    @Override
    public MemberResponse getMemberbyLoginId(String loginid) {
        return memberRepository.findDataByLoginId(loginid).orElseThrow(() -> new NoSuchElementException("해당 유저가 존재하지 않습니다."));
    }
}
