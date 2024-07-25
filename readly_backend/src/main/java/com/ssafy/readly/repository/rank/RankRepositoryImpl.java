package com.ssafy.readly.repository.rank;


import com.ssafy.readly.dto.rank.GetRankGroupResponse;
import com.ssafy.readly.dto.rank.GetRankUserResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class RankRepositoryImpl implements RankRepository {
    private final EntityManager entityManager;

    @Override
    public List<GetRankUserResponse> getMembers() {
        String jpql = "SELECT new com.ssafy.readly.dto.rank.GetRankUserResponse(m.id, m.memberName, COUNT(rb.id)) " +
                "FROM Member m " +
                "LEFT JOIN ReadBook rb ON m.id = rb.member.id " +
                "GROUP BY m.id, m.memberName " +
                "ORDER BY COUNT(rb.id) DESC";

        TypedQuery<GetRankUserResponse> query = entityManager.createQuery(jpql, GetRankUserResponse.class);
        query.setMaxResults(10);  // 상위 3개 결과만 가져오기

        return query.getResultList();
    }

    @Override
    public List<GetRankGroupResponse> getGroups() throws Exception {
        String jpql = "SELECT new com.ssafy.readly.dto.rank.GetRankGroupResponse(g.id, g.title, COUNT(rb.id)) " +
                "FROM Group g " +
                "LEFT JOIN ReadBook rb ON g.id = rb.group.id " +
                "GROUP BY g.id, g.title " +
                "ORDER BY COUNT(rb.id) DESC";

        TypedQuery<GetRankGroupResponse> query = entityManager.createQuery(jpql, GetRankGroupResponse.class);
        query.setMaxResults(10);  // 상위 3개 결과만 가져오기

        return query.getResultList();
    }
}
