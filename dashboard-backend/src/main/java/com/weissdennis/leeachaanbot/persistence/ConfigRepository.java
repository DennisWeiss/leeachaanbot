package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends MongoRepository<Configs, Void> {
}
