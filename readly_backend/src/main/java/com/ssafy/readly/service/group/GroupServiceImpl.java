package com.ssafy.readly.service.group;


import com.ssafy.readly.dto.group.GetGroupResponse;
import com.ssafy.readly.dto.group.MakeGroupRequest;
import com.ssafy.readly.entity.Group;
import com.ssafy.readly.repository.group.GroupRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService{
    private final GroupRepository groupRepository;

    @Override
    public String makeGroup(MakeGroupRequest makeGroupRequest) throws Exception {
        return  groupRepository.makeGroup(makeGroupRequest);
    }

    @Override
    public void updateRoomId(String groupId, String roomId) throws Exception {
        groupRepository.updateRoomId(groupId,roomId);
    }

    @Override
    public List<GetGroupResponse> findAllGroup() throws Exception {
        return groupRepository.findAllGroup();
    }

}
