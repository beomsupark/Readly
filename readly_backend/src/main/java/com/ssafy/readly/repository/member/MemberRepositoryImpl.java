package com.ssafy.readly.repository.member;

import com.ssafy.readly.dto.member.FindMember;
import com.ssafy.readly.dto.member.LoginMember;
import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.entity.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository {

    private final EntityManager em;

    @Override
    public void signUp(Member member) {
        em.persist(member);
    }

    @Override
    public void login(LoginMember longinMember) {

    }

    @Override
    public void logout(String userId) {

    }

    @Override
    public long findById(String loginId) {
        return (long) em.createQuery("select count(m.id) from Member m where m.loginId = :loginId")
                .setParameter("loginId", loginId)
                .getSingleResult();
    }

    @Override
    public String checkMember(FindMember findMember) {
        return "";
    }

}
