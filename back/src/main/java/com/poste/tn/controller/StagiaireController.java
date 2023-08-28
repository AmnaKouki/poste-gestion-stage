package com.poste.tn.controller;

import com.poste.tn.interfaces.StageRepository;
import com.poste.tn.interfaces.StagiaireRepository;
import com.poste.tn.model.Stage;
import com.poste.tn.model.Stagiaire;
import com.poste.tn.model.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class StagiaireController {

    @Autowired
    StagiaireRepository repository;

    @GetMapping("/stagiaire/find_all")
    @CrossOrigin
    public List<Stagiaire> getAllStagiaires() {
        return repository.findAll();
    }

    @PostMapping("/stagiaire/add")
    @CrossOrigin
    public Stagiaire addStage(@RequestBody Stagiaire stagiaire) {
        return repository.save(stagiaire);
    }

    @PostMapping("/stagiaire/find-by-id/{id}")
    @CrossOrigin
    public ResponseEntity<String> findStagiaiareById2(@PathVariable String id) {
        if (repository.findById(id).isPresent()) {
            Stagiaire existingStagiaire = repository.findById(id).get();
            return ResponseEntity.ok(existingStagiaire.toString());
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/stagiaire/find-by-cin/{cin}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Stagiaire> findStagiaiareByCin(@PathVariable String cin) {
        Optional<Stagiaire> optionalStagiaire = repository.findByCin(cin);

        if (optionalStagiaire.isPresent()) {

            Stagiaire existingStagiaire = optionalStagiaire.get();
            return ResponseEntity.ok(existingStagiaire);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping("/stagiaire/update/{cin}")
    @CrossOrigin
    public ResponseEntity updateStagiaire(@PathVariable String cin, @RequestBody Stagiaire updatedstagigiare) {
        Optional<Stagiaire> optionalStagiaire = repository.findByCin(cin);
        if (optionalStagiaire.isPresent()) {

            Stagiaire stagiaire = optionalStagiaire.get();
            stagiaire.setMail(updatedstagigiare.getMail());
            stagiaire.setAdresse(updatedstagigiare.getAdresse());
            stagiaire.setPrenomFr(updatedstagigiare.getPrenomFr());
            stagiaire.setPrenomArabe(updatedstagigiare.getPrenomArabe());
            stagiaire.setNomFr(updatedstagigiare.getNomFr());
            stagiaire.setNomArabe(updatedstagigiare.getNomArabe());
            stagiaire.setDateNaissance(updatedstagigiare.getDateNaissance());
            stagiaire.setTelephone(updatedstagigiare.getTelephone());
            stagiaire.setCin(updatedstagigiare.getCin());

            repository.save(stagiaire);


            return ResponseEntity.ok(stagiaire);
        } else {
            return ResponseEntity.notFound().build();
        }

    }
    /*
    @PostMapping("/stagiaire/update/{id}")
    @CrossOrigin
    public Stagiaire updateStagiaiare(@PathVariable String cin, @RequestBody Stagiaire hi) {
        Optional<Stagiaire> updatedStagiaire = repository.findById(cin);
        Stagiaire stagiaire = updatedStagiaire.get();
        return repository.save(stagiaire);
    }
*/
    @DeleteMapping("/stagiaire/stage/delete/{id}")
    @CrossOrigin
    public ResponseEntity<Stagiaire> deleteElement(@PathVariable("id") String id) {
        Optional<Stagiaire> optionalStagiaire = repository.findById(id);
        if (optionalStagiaire.isPresent()) { Stagiaire existingEntity = optionalStagiaire.get();
            repository.delete(existingEntity);

            return ResponseEntity.ok(existingEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}

