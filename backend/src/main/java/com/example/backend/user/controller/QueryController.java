package com.example.backend.user.controller;

import com.example.backend.user.dto.ImageDTO;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.service.QueryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/query")
public class QueryController {
//    @Autowired
    private final QueryService queryService;

    @PostMapping("/a")
    public ResponseEntity<?> postMethodName(@RequestBody QueryDTO queryDTO) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQueryForText(queryDTO));
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @PostMapping(value = "/image", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, "multipart/form-data;charset=UTF-8"})
    public ResponseEntity<?> postMethodName2(@RequestPart("image") MultipartFile image) {
        try {
            ImageDTO imageDTO = ImageDTO.builder()
                .files(image)
                .build();
            log.info("Recieved image=  {}", imageDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQueryForImage2(imageDTO));
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getMethodName() {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(queryService.getAllQueries());
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }



}
