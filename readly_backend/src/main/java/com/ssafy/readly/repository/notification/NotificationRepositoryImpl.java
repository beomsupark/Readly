package com.ssafy.readly.repository.notification;

import com.ssafy.readly.entity.Notification;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NotificationRepositoryImpl implements NotificationRepository {

    private final EntityManager entityManager;

    @Override
    public List<Notification> findByUserIdAndIsReadFalse(int memberId) throws Exception {
        return entityManager.createQuery(
                        "SELECT n FROM Notification n WHERE n.memberId = :memberId AND n.isRead = 'N'", Notification.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    @Override
    public void markAsReadByUserId(int memberId) throws Exception {
        entityManager.createQuery(
                        "UPDATE Notification n SET n.isRead = 'Y' WHERE n.memberId = :memberId")
                .setParameter("memberId", memberId)
                .executeUpdate();
    }

    @Override
    public void save(Notification notification) throws Exception {

        entityManager.persist(notification);
    }

    @Override
    public Optional<Notification> findById(int notificationId) {
        Notification notification = entityManager.find(Notification.class, notificationId);
        return Optional.ofNullable(notification);
    }
}

