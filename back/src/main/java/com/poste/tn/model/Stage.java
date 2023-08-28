package com.poste.tn.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Stages")
public class Stage {

    @Id
    private String id;
    private String cinStagiaire;
    private String matriculeEncardreur;
    private String objet;
    private String typeStage;
    private String lieuStage;
    private String dateDebut;
    private String dateFin;
    private String institutFr;
    private String institutArabe;
    private String specialiteArabe;
    private String specialiteFr;
    public String typeInstitut ;

    public Stage(String id, String cinStagiaire, String matriculeEncardreur, String objet, String typeStage, String lieuStage,
                 String dateDebut, String dateFin, String institutFr, String institutArabe, String specialiteArabe,
                 String specialiteFr, String typeInstitut) {
        this.id = id;
        this.cinStagiaire = cinStagiaire;
        this.matriculeEncardreur = matriculeEncardreur;
        this.objet = objet;
        this.typeStage = typeStage;
        this.lieuStage = lieuStage;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.institutFr = institutFr;
        this.institutArabe = institutArabe;
        this.specialiteArabe = specialiteArabe;
        this.specialiteFr = specialiteFr;
        this.typeInstitut = typeInstitut;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCinStagiaire() {
        return cinStagiaire;
    }

    public void setCinStagiaire(String cinStagiaire) {
        this.cinStagiaire = cinStagiaire;
    }

    public String getMatriculeEncardreur() {
        return matriculeEncardreur;
    }

    public void setMatriculeEncardreur(String matriculeEncardreur) {
        this.matriculeEncardreur = matriculeEncardreur;
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getTypeStage() {
        return typeStage;
    }

    public void setTypeStage(String typeStage) {
        this.typeStage = typeStage;
    }

    public String getLieuStage() {
        return lieuStage;
    }

    public void setLieuStage(String lieuStage) {
        this.lieuStage = lieuStage;
    }

    public String getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(String dateDebut) {
        this.dateDebut = dateDebut;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String dateFin) {
        this.dateFin = dateFin;
    }

    public String getInstitutFr() {
        return institutFr;
    }

    public void setInstitutFr(String institutFr) {
        this.institutFr = institutFr;
    }

    public String getInstitutArabe() {
        return institutArabe;
    }

    public void setInstitutArabe(String institutArabe) {
        this.institutArabe = institutArabe;
    }

    public String getSpecialiteArabe() {
        return specialiteArabe;
    }

    public void setSpecialiteArabe(String specialiteArabe) {
        this.specialiteArabe = specialiteArabe;
    }

    public String getSpecialiteFr() {
        return specialiteFr;
    }

    public void setSpecialiteFr(String specialiteFr) {
        this.specialiteFr = specialiteFr;
    }

    public String getTypeInstitut() {
        return typeInstitut;
    }

    public void setTypeInstitut(String typeInstitut) {
        this.typeInstitut = typeInstitut;
    }

    @Override
    public String toString() {
        return "Stage{" +
                "id='" + id + '\'' +
                ", cinStagiaire='" + cinStagiaire + '\'' +
                ", matriculeEncardreur='" + matriculeEncardreur + '\'' +
                ", objet='" + objet + '\'' +
                ", typeStage='" + typeStage + '\'' +
                ", lieuStage='" + lieuStage + '\'' +
                ", dateDebut='" + dateDebut + '\'' +
                ", dateFin='" + dateFin + '\'' +
                ", institutFr='" + institutFr + '\'' +
                ", institutArabe='" + institutArabe + '\'' +
                ", specialiteArabe='" + specialiteArabe + '\'' +
                ", specialiteFr='" + specialiteFr + '\'' +
                ", typeInstitut='" + typeInstitut + '\'' +
                '}';
    }
}
