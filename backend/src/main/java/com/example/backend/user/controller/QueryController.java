package com.example.backend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.service.QueryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
            return ResponseEntity.status(HttpStatus.CREATED).body(queryService.createQuery(queryDTO));
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
