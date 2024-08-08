package com.ssafy.readly.controller;

import com.ssafy.readly.dto.group.GetGroupResponse;
import com.ssafy.readly.dto.proceeding.ProceedingDetailResponseDTO;
import com.ssafy.readly.dto.proceeding.ProceedingRequestDTO;
import com.ssafy.readly.dto.proceeding.ProceedingResponseDTO;
import com.ssafy.readly.entity.Proceeding;
import com.ssafy.readly.service.proceeding.ProceedingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProceedingController {

    private final ProceedingService proceedingService;

    @GetMapping("/proceeding")
    public ResponseEntity<Map<String, Object>> getProceedings(@RequestBody ProceedingRequestDTO requestDTO) throws Exception {
        List<Proceeding> proceedings = proceedingService.getProceedingsByGroupId(requestDTO.getGroupId(), requestDTO.getPageSize(), requestDTO.getPageNumber());
        long totalProceedings = proceedingService.countProceedingsByGroupId(requestDTO.getGroupId());

        List<ProceedingResponseDTO> responseDTOs = proceedings.stream().map(proceeding -> {
            ProceedingResponseDTO dto = new ProceedingResponseDTO();
            dto.setId(proceeding.getId());
            dto.setCreatedDate(proceeding.getCreatedDate());
            dto.setTitle(proceeding.getTitle());
            return dto;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("proceedings", responseDTOs);
        response.put("totalProceedings", totalProceedings);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/proceeding/{proceedingId}")
    public ResponseEntity<ProceedingDetailResponseDTO> getProceedingDetail(@PathVariable("proceedingId") int proceedingId) throws Exception {
        Proceeding proceeding = proceedingService.getProceedingById(proceedingId);

        ProceedingDetailResponseDTO proceedingDetailResponseDTO = ProceedingDetailResponseDTO.of(proceeding);
        return new ResponseEntity<>(proceedingDetailResponseDTO, HttpStatus.OK);
    }
}