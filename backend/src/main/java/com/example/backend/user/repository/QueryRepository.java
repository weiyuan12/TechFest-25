package com.example.backend.user.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.user.model.Query;

@Repository
public interface QueryRepository extends MongoRepository<Query, String>{

}
