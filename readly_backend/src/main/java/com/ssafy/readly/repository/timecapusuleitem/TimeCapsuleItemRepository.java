package com.ssafy.readly.repository.timecapusuleitem;

import com.ssafy.readly.entity.TimeCapsuleItem;

import java.util.Optional;

public interface TimeCapsuleItemRepository {
    void save(final TimeCapsuleItem item);
    void delete(final TimeCapsuleItem item);
    Optional<TimeCapsuleItem> findTimeCapsuleItemByReviewId(Integer reviewId);
    Optional<TimeCapsuleItem> findTimeCapsuleItemByPhotoCardId(Integer photoCardId);
}
