package com.ssafy.readly.repository.proceeding;

import com.ssafy.readly.entity.Proceeding;

import java.util.List;

public interface ProceedingRepository {
   List<Proceeding> getProceedingsByGroupId(int groupId, int pageSize, int pageNumber) throws Exception;

    long countProceedingsByGroupId(int groupId) throws Exception;

    Proceeding getProceedingById(int id)  throws Exception;
}
