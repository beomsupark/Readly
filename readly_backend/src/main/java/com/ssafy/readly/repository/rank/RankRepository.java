package com.ssafy.readly.repository.rank;


import com.ssafy.readly.dto.rank.GetRankGroupResponse;
import com.ssafy.readly.dto.rank.GetRankUserResponse;


import java.util.List;

public interface RankRepository {
    List<GetRankUserResponse> getMembers()  throws Exception;

    List<GetRankGroupResponse> getGroups() throws Exception;


}
