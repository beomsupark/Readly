package com.ssafy.readly.repository.timecapusuleitem;

import com.ssafy.readly.entity.TimeCapsuleItem;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TimeCapsuleItemRepositoryImpl implements TimeCapsuleItemRepository {
    private final EntityManager em;

    @Override
    public void save(final TimeCapsuleItem item) {em.persist(item);}

    @Override
    public void delete(final TimeCapsuleItem item) {em.remove(item);}
}
