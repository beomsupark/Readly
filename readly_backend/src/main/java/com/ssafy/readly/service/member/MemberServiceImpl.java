package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.*;
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
                signUpMember.getSocial(),
                signUpMember.getText());
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
    public LoginMemberResponse login(LoginMemberRequest longinMember) {
        Optional<LoginMemberResponse> loginMemberResponse = memberRepository.login(longinMember);

        return loginMemberResponse.orElse(null);
    }

    @Override
    public void saveRefreshToken(int id, String refreshToken) {

    }

    @Override
    public Object getRefreshToken(int id) {
        return null;
    }

    @Override
    public void deleteRefreshToken(int id) {

    }

    @Override
    public MemberResponse getMember(int id) {
        Optional<Member> findMember = memberRepository.findById(id);
        Member member = findMember.orElseThrow(() -> new NoSuchElementException("해당 회원은 존재하지 않습니다."));
        return MemberResponse
                .builder()
                .id(member.getId())
                .loginId(member.getLoginId())
                .nickname(member.getNickname())
                .memberName(member.getMemberName())
                .phoneNumber(member.getPhoneNumber())
                .email(member.getEmail())
                .point(member.getPoint())
                .birthday(member.getBirthday())
                .joinDate(member.getJoinDate())
                .gender(member.getGender())
                .introduction(member.getIntroduction())
                .build();
    }

    @Override
    public Member getMemberEntity(int id) {
        Optional<Member> findMember = memberRepository.findById(id);
        return findMember.orElseThrow(() -> new NoSuchElementException("해당 회원은 존재하지 않습니다."));
    }

    @Transactional
    @Override
    public void updateMember(UpdateMemberRequest updateMember) {
        memberRepository.updateMember(updateMember);
    }

    @Override
    public String checkMember(FindMemberRequest findMember) {
        return "";
    }

}
