package com.ssafy.readly.service.proceeding;

import com.ssafy.readly.entity.Proceeding;

import java.util.List;

public interface ProceedingService {
    List<Proceeding> getProceedingsByGroupId(int groupId, int pageSize, int pageNumber) throws Exception;

    long countProceedingsByGroupId(int groupId) throws Exception;

    Proceeding getProceedingById(int id) throws Exception;
}
