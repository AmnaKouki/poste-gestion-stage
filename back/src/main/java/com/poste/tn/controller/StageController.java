package com.poste.tn.controller;

import com.poste.tn.interfaces.LieuStageRepository;
import com.poste.tn.interfaces.StageRepository;
import com.poste.tn.interfaces.StagiaireRepository;
import com.poste.tn.interfaces.UtilisateurRepository;
import com.poste.tn.model.LieuStage;
import com.poste.tn.model.Stage;
import com.poste.tn.model.Stagiaire;
import com.poste.tn.model.Utilisateur;
import com.poste.tn.payload.response.StageAllResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class StageController {
    @Autowired
    StageRepository stageRepository;
    @Autowired
    UtilisateurRepository userRepository;

    @Autowired
    StagiaireRepository stagiaireRepository;

    @Autowired
    LieuStageRepository lieuStageRepository;


    @GetMapping("/stage/find_all")
    @CrossOrigin
    public List<StageAllResponse> getAllStages() {

        List<StageAllResponse> res = new ArrayList<>();

        List<Stage> stages = stageRepository.findAll();
        for (Stage stage : stages) {
            String matEncadrant = stage.getMatriculeEncardreur();
            Utilisateur encadrant = null;
            LieuStage lieuStage = null;
            Stagiaire stagiaire = null;

            // get lieuStage
            if(lieuStageRepository.findById(stage.getLieuStage()).isPresent()) {
                lieuStage = lieuStageRepository.findById(stage.getLieuStage()).get();
            }

            // get Encadrant
            if (userRepository.findByMatricule(matEncadrant).isPresent()) {
                encadrant = userRepository.findByMatricule(matEncadrant).get();
            }

            // Get Stagiaire
            if (stagiaireRepository.findByCin(stage.getCinStagiaire()).isPresent()) {
                stagiaire = stagiaireRepository.findByCin(stage.getCinStagiaire()).get();
            }

            // Group Response
            StageAllResponse stageStagiaireEnc = new StageAllResponse(stage, stagiaire, encadrant, lieuStage);
            res.add(stageStagiaireEnc);
        }

        return res;
    }

    @PostMapping("/stage/add")
    @CrossOrigin
    public Stage addStage(@RequestBody Stage stage) {
        return stageRepository.save(stage);
    }

    @PostMapping("/stage/find_by_id/{id}")
    @CrossOrigin
    public ResponseEntity<String> findStageById2(@PathVariable String id) {
        if (stageRepository.findById(id).isPresent()) {
            Stage existingStage = stageRepository.findById(id).get();
            return ResponseEntity.ok(existingStage.toString());
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping("/stage/update/{id}")
    @CrossOrigin
    public ResponseEntity updateStage(@PathVariable String id, @RequestBody Stage updatedStage) {

        Optional<Stage> optionalStage = stageRepository.findById(id);
        if (optionalStage.isPresent()) {
            Stage stage = optionalStage.get();
            stage.setLieuStage(updatedStage.getLieuStage());
            stage.setTypeStage(updatedStage.getTypeStage());
            stage.setDateDebut(updatedStage.getDateDebut());
            stage.setDateFin(updatedStage.getDateFin());
            stage.setMatriculeEncardreur(updatedStage.getMatriculeEncardreur());
            stage.setInstitutFr(updatedStage.getInstitutFr());
            stage.setInstitutArabe(updatedStage.getInstitutArabe());
            stage.setObjet(updatedStage.getObjet());
            stage.setTypeInstitut(updatedStage.getTypeInstitut());
            stage.setSpecialiteFr(updatedStage.getSpecialiteFr());
            stage.setSpecialiteArabe(updatedStage.getSpecialiteArabe());
            stage.setCinStagiaire(updatedStage.getCinStagiaire());


            stageRepository.save(stage);

            return ResponseEntity.ok(stage);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/stage/delete/{id}")
    @CrossOrigin
    public ResponseEntity<Stage> deleteElement(@PathVariable("id") String id) {
        Optional<Stage> optionalStage = stageRepository.findById(id);

        if (optionalStage.isPresent()) {
            Stage existingEntity = optionalStage.get();
            stageRepository.delete(existingEntity);

            return ResponseEntity.ok(existingEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
