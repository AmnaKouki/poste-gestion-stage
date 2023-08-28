package com.poste.tn.interfaces;

import com.poste.tn.model.LieuStage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LieuStageRepository extends MongoRepository<LieuStage, String> {
}
