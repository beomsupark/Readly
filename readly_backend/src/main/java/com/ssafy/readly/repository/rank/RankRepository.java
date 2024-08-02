package com.ssafy.readly.repository.rank;


import com.ssafy.readly.dto.rank.GetRankGroupResponse;
import com.ssafy.readly.dto.rank.GetRankUserResponse;
import com.ssafy.readly.dto.rank.GetUserGroupsRankResponse;
import com.ssafy.readly.dto.rank.GetUserRankResponse;


import java.util.List;

public interface RankRepository {
    List<GetRankUserResponse> getMembers()  throws Exception;

    List<GetRankGroupResponse> getGroups() throws Exception;


    GetUserRankResponse getUserRank(int memberId) throws Exception;

    List<GetUserGroupsRankResponse> getUserGroupsRank(int memberId) throws Exception;

}
