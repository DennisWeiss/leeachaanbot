package com.weissdennis.leeachaanbot.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomCommandRespository extends MongoRepository<Customcommands, String> {
}
