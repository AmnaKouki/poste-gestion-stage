package com.poste.tn.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "Users")
public class Utilisateur {
    @Id
    private String id;
    @Indexed(unique = true)
    private String matricule;
    @JsonIgnore
    private String password;
    private String nomArabe;
    private String prenomArabe;

    private String nomFr;
    private String prenomFr;
    @Indexed(unique = true)
    private String cin;
    private String siegeAdministratif;
    private String fonction;


    private String administration;
    private String telephone;
    private String photoPath;

    @DBRef
    private Set<Role> roles = new HashSet<>();



    public Utilisateur(String matricule, String password, String nomArabe, String prenomArabe, String nomFr,
                       String prenomFr, String cin, String siegeAdministratif, String administration,String fonction,
                       String telephone, String photoPath) {

        this.matricule = matricule;
        this.password = password;
        this.nomArabe = nomArabe;
        this.prenomArabe = prenomArabe;
        this.nomFr = nomFr;
        this.prenomFr = prenomFr;
        this.cin = cin;
        this.siegeAdministratif = siegeAdministratif;
        this.administration = administration;
        this.fonction = fonction;
        this.telephone = telephone;
        this.photoPath = photoPath;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getFonction() {
        return this.fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }
    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }



    public String getSiegeAdministratif() {
        return siegeAdministratif;
    }

    public void setSiegeAdministratif(String siegeAdministratif) {
        this.siegeAdministratif = siegeAdministratif;
    }

    public String getAdministration() {
        return administration;
    }

    public void setAdministration(String administration) {
        this.administration = administration;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
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

    public Set<Role> getRoles() {
        return roles;
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
                "id='" + id + '\'' +
                ", matricule='" + matricule + '\'' +
                ", password='" + password + '\'' +
                ", nomArabe='" + nomArabe + '\'' +
                ", prenomArabe='" + prenomArabe + '\'' +
                ", nomFr='" + nomFr + '\'' +
                ", prenomFr='" + prenomFr + '\'' +
                ", cin='" + cin + '\'' +
                ", siegeAdministratif='" + siegeAdministratif + '\'' +
                ", fonction='" + fonction + '\'' +
                ", administration='" + administration + '\'' +
                ", telephone='" + telephone + '\'' +
                ", photoPath='" + photoPath + '\'' +
                ", roles=" + roles +
                '}';
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
