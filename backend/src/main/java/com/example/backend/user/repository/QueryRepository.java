package com.example.backend.user.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.user.model.Query;
import java.util.List;


@Repository
public interface QueryRepository extends MongoRepository<Query, UUID>{
    List<Query> findByUsername(String username);

}
