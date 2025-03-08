package com.example.backend.user.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.backend.user.client.PythonServiceClient;
import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.dto.QueryResponseDTO;
import com.example.backend.user.mapper.QueryMapper;
import com.example.backend.user.model.Query;
import com.example.backend.user.repository.QueryRepository;

import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class QueryService {
    private final QueryRepository queryRepository;
    private final QueryMapper queryMapper;
    private final PythonServiceClient pythonServiceClient;

    public Query createQuery(QueryDTO queryDTO){
        queryDTO.setId(UUID.randomUUID());
        Query query = queryMapper.fromQueryDTOtoQueryForCreate(queryDTO);
        query.setCreatedAt(LocalDateTime.now());

        log.info("userQuery: {}", query);
        // call llm
        QueryResponseDTO response = pythonServiceClient.postText(queryDTO);

        // set the values after calling llm
        query.setCategory(response.getId());
        query.setTruthScore(response.getTruthScore());
        query.setReasoning(response.getReasoning());
        query.setCitations(response.getCitations());
        queryRepository.save(query);
        return query;
    }

    public List<Query> getAllQueries() {
        List<Query> queries = queryRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
        return queries;
    }

}
