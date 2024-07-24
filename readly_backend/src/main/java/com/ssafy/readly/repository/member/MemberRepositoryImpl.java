package com.ssafy.readly.repository.member;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.member.FindMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.entity.Member;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import static com.ssafy.readly.entity.QMember.member;

@Repository
public class MemberRepositoryImpl implements MemberRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public MemberRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void signUp(Member member) {
        em.persist(member);
    }

    @Override
    public void login(LoginMemberRequest longinMember) {

    }

    @Override
    public void logout(String userId) {

    }

    @Override
    public Long findByLoginId(String loginId) {
        return queryFactory
                .select(member.id.count())
                .from(member)
                .where(member.loginId.eq(loginId))
                .fetchOne();
    }

    @Override
    public String checkMember(FindMemberRequest findMember) {
        return "";
    }

}
