package com.poste.tn.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "LieuxDeStage")
public class LieuStage {
    @Id
    private String id;
    private String adresse;
    private String adresseFr;
    private String codePostal;


    public LieuStage(String id, String adresse, String adresseFr, String codePostal) {
        this.id = id;
        this.adresse = adresse;
        this.adresseFr = adresseFr;
        this.codePostal = codePostal;
    }

    public String getAdresseFr() {
        return adresseFr;
    }

    public void setAdresseFr(String adresseFr) {
        this.adresseFr = adresseFr;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAdresse() {
        return adresse;
    }

    @Override
    public String toString() {
        return "LieuStage{" +
                "id='" + id + '\'' +
                ", adresse='" + adresse + '\'' +
                ", adresseFr='" + adresseFr + '\'' +
                ", codePostal='" + codePostal + '\'' +
                '}';
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }




}
