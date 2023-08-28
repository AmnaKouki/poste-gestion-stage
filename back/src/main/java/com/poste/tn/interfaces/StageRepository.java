package com.poste.tn.interfaces;

import com.poste.tn.model.Stage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StageRepository extends MongoRepository<Stage, String> {
}
