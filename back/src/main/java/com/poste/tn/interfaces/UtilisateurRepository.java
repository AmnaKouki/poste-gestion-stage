package com.poste.tn.interfaces;

import com.poste.tn.model.Stagiaire;
import com.poste.tn.model.Utilisateur;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends MongoRepository<Utilisateur, String> {
    Utilisateur  findByCin(String cin);
    Optional<Utilisateur> findByMatricule(String matricule);

    Boolean existsByMatricule(String matricule);

}
