package com.example.backend.user.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.dto.QueryResponseDTO;

@FeignClient(name="PythonService", url = "http://localhost:8000")
public interface PythonServiceClient {
    @PostMapping("/text")
    QueryResponseDTO postText(@RequestBody QueryDTO queryDTO);

    @PostMapping("/image")
    QueryResponseDTO postImage(@RequestBody QueryDTO queryDTO);
    
}
