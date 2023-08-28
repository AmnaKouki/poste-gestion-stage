package com.poste.tn.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import java.util.List;

@Document(collection = "Stagiaires")
public class Stagiaire {
    @Id
    private String id;
    private String nomArabe;
    private String prenomArabe;
    private String nomFr;
    private String prenomFr;

    @Indexed(unique = true)
    private String cin;
    private String mail;
    private String dateNaissance;
    private String adresse;
    private String telephone;
    private List<String> listeStages;

    public Stagiaire(String id, String nomArabe, String prenomArabe, String nomFr,
                     String prenomFr, String cin, String mail, String dateNaissance, String adresse,
                     String telephone, List<String> listeStages) {
        this.id = id;
        this.nomArabe = nomArabe;
        this.prenomArabe = prenomArabe;
        this.nomFr = nomFr;
        this.prenomFr = prenomFr;
        this.mail = mail;
        this.dateNaissance = dateNaissance;
        this.adresse = adresse;
        this.telephone = telephone;
        this.listeStages = listeStages;
        this.cin = cin;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getNomArabe() {
        return nomArabe;
    }

    public void setNomArabe(String nomArabe) {
        this.nomArabe = nomArabe;
    }

    public String getPrenomArabe() {
        return prenomArabe;
    }

    public void setPrenomArabe(String prenomArabe) {
        this.prenomArabe = prenomArabe;
    }

    public String getNomFr() {
        return nomFr;
    }

    public void setNomFr(String nomFr) {
        this.nomFr = nomFr;
    }

    public String getPrenomFr() {
        return prenomFr;
    }

    public void setPrenomFr(String prenomFr) {
        this.prenomFr = prenomFr;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(String dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public List<String> getListeStages() {
        return listeStages;
    }

    public void setListeStages(List<String> listeStages) {
        this.listeStages = listeStages;
    }

    @Override
    public String toString() {
        return "Stagiaire{" +
                "id='" + id + '\'' +
                ", nomArabe='" + nomArabe + '\'' +
                ", prenomArabe='" + prenomArabe + '\'' +
                ", nomFr='" + nomFr + '\'' +
                ", prenomFr='" + prenomFr + '\'' +
                ", cin='" + cin + '\'' +
                ", mail='" + mail + '\'' +
                ", dateNaissance='" + dateNaissance + '\'' +
                ", adresse='" + adresse + '\'' +
                ", telephone='" + telephone + '\'' +
                ", listeStages=" + listeStages +
                '}';
    }
}
