package com.poste.tn.controller;

import com.poste.tn.interfaces.LieuStageRepository;
import com.poste.tn.model.LieuStage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class LieuStageController {
    @Autowired
    LieuStageRepository repository;


    @GetMapping(value = "/lieu-de-stage/find-all")
    @CrossOrigin
    public List<LieuStage> getAllInternshipPlaces() {
        return repository.findAll();
    }

    @PostMapping("/lieu-de-stage/add")
    @CrossOrigin
    public LieuStage addLieuDeStage(@RequestBody LieuStage lieuDeStage) {
        return repository.save(lieuDeStage);
    }

    @GetMapping("/lieu-de-stage/find-by-id/{text}")
    @CrossOrigin
    public LieuStage findPlaceById(@PathVariable String text) {
        if (repository.findById(text).isPresent()) {
            return repository.findById(text).get();
        } else {
            return null;
        }
    }

    @PostMapping("/lieu-de-stage/update/{id}")
    @CrossOrigin
    public ResponseEntity updateLieuDeStage(@PathVariable String id, @RequestBody LieuStage updatedLieu) {
        Optional<LieuStage> optionalPlace = repository.findById(id);
        if (optionalPlace.isPresent()) {

            LieuStage lieuStage = optionalPlace.get();
            lieuStage.setAdresse(updatedLieu.getAdresse());
            lieuStage.setAdresseFr(updatedLieu.getAdresseFr());
            lieuStage.setCodePostal(updatedLieu.getCodePostal());


            repository.save(lieuStage);

            return ResponseEntity.ok(lieuStage);        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/lieu-de-stage/delete/{id}")
    @CrossOrigin
    public ResponseEntity<LieuStage> deleteElement(@PathVariable("id") String id) {
        Optional<LieuStage> optionalPlace = repository.findById(id);

        if (optionalPlace.isPresent()) {
            LieuStage existingEntity = optionalPlace.get();
            repository.delete(existingEntity); // Delete the entity

            return ResponseEntity.ok(existingEntity);
        } else {
            return ResponseEntity.notFound().build(); //response code : 404 not found
        }
    }

}
