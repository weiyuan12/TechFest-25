package com.example.backend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.service.QueryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/query")
public class QueryController {
//    @Autowired
    private final QueryService queryService;

    @PostMapping("/queryImage")
    public ResponseEntity<?> postImage(@RequestBody QueryDTO queryDTO) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQuery(queryDTO));
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }
    
    @PostMapping("/queryText")
    public ResponseEntity<?> postText(@RequestBody QueryDTO queryDTO) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQuery(queryDTO));
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }



}
