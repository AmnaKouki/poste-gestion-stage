package com.poste.tn.payload.response;

import com.poste.tn.model.LieuStage;
import com.poste.tn.model.Stage;
import com.poste.tn.model.Stagiaire;
import com.poste.tn.model.Utilisateur;

public class StageAllResponse {
    private Stage stage;
    private LieuStage lieuStage;

    private Stagiaire stagiaire;

    public StageAllResponse(Stage stage, Stagiaire stagiaire, Utilisateur encadrant, LieuStage lieuStage) {
        this.stage = stage;
        this.stagiaire = stagiaire;
        this.encadrant = encadrant;
        this.lieuStage = lieuStage;
    }

    private Utilisateur encadrant;


    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public Stagiaire getStagiaire() {
        return stagiaire;
    }

    public void setStagiaire(Stagiaire stagiaire) {
        this.stagiaire = stagiaire;
    }

    public Utilisateur getEncadrant() {
        return encadrant;
    }

    public void setEncadrant(Utilisateur encadrant) {
        this.encadrant = encadrant;
    }

    public LieuStage getLieuStage() {
        return lieuStage;
    }

    public void setLieuStage(LieuStage lieuStage) {
        this.lieuStage = lieuStage;
    }
}
