package com.ssafy.readly.service.rank;



import com.ssafy.readly.dto.rank.GetRankGroupResponse;
import com.ssafy.readly.dto.rank.GetRankUserResponse;

import java.util.List;

public interface RankService {

    List<GetRankUserResponse> getMembers()  throws Exception;

    List<GetRankGroupResponse> getGroups() throws Exception;
}
