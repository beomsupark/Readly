package com.ssafy.readly.repository.proceeding;

import com.ssafy.readly.entity.Proceeding;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ProceedingRepositoryImpl implements ProceedingRepository {


    private final EntityManager entityManager;

    @Override
    public List<Proceeding> getProceedingsByGroupId(int groupId, int pageSize, int pageNumber) {
        String jpql = "SELECT p FROM Proceeding p WHERE p.group.id = :groupId";
        TypedQuery<Proceeding> query = entityManager.createQuery(jpql, Proceeding.class);
        query.setParameter("groupId", groupId);
        query.setFirstResult(pageSize * (pageNumber-1));
        query.setMaxResults(pageSize);
        return query.getResultList();
    }


    @Override
    public long countProceedingsByGroupId(int groupId) {
        String jpql = "SELECT COUNT(p) FROM Proceeding p WHERE p.group.id = :groupId";
        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class);
        query.setParameter("groupId", groupId);
        return query.getSingleResult();
    }

    @Override
    public Proceeding getProceedingById(int id) throws Exception {
        String jpql = "SELECT p FROM Proceeding p WHERE p.id = :id";
        TypedQuery<Proceeding> query = entityManager.createQuery(jpql, Proceeding.class);
        query.setParameter("id", id);
        return query.getResultStream().findFirst().orElseThrow(() -> new Exception("Proceeding not found"));
    }
}
