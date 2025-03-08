package com.example.backend.user.client;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.user.dto.ImageDTO;
import com.example.backend.user.dto.ImageResponseDTO;
import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.dto.QueryResponseDTO;

@FeignClient(name="PythonService", url = "http://genai:8000")
public interface PythonServiceClient {
    @PostMapping("/text")
    QueryResponseDTO postText(@RequestBody QueryDTO queryDTO);

    @PostMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ImageResponseDTO postImage(@RequestPart("files") MultipartFile image, @RequestPart("messageId") String messageId);
    
}
