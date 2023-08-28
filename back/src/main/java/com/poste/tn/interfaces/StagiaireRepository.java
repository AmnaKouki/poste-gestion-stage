package com.poste.tn.interfaces;

import com.poste.tn.model.Stagiaire;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StagiaireRepository extends MongoRepository<Stagiaire, String> {
    //Stagiaire findByCin(String cin);
    Optional<Stagiaire> findByCin(String cin);

}
