package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<Users, String> {
    Optional<Users> findByName(String name);

    Optional<Users> findByUserId(String userId);

    void deleteByName(String name);
}
