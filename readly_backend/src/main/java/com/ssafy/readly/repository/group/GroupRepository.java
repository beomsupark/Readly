package com.ssafy.readly.repository.group;

import com.ssafy.readly.dto.group.GetGroupResponse;
import com.ssafy.readly.dto.group.MakeGroupRequest;
import com.ssafy.readly.entity.Group;

import java.util.List;

public interface GroupRepository {
    String makeGroup(MakeGroupRequest makeGroupRequest) throws Exception;

    void updateRoomId(String groupId, String roomId) throws Exception;

    List<GetGroupResponse> findAllGroup() throws Exception;

}