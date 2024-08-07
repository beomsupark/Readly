package com.ssafy.readly.repository.timecapusuleitem;

import com.ssafy.readly.entity.TimeCapsuleItem;

public interface TimeCapsuleItemRepository {
    void save(final TimeCapsuleItem item);
    void delete(final TimeCapsuleItem item);
}
