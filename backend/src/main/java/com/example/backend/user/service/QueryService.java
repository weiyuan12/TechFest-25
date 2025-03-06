package com.example.backend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.mapper.QueryMapper;
import com.example.backend.user.model.Query;
import com.example.backend.user.repository.QueryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class QueryService {

    @Autowired
    public final QueryRepository queryRepository;

    public final QueryMapper queryMapper;

    public Query createQuery(QueryDTO queryDTO){
        Query userQuery = queryMapper.fromQueryDTOtoQueryForCreate(queryDTO);
        queryRepository.save(userQuery);
        return userQuery;
    }
    
}
