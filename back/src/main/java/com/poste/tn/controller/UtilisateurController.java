package com.poste.tn.controller;

import com.poste.tn.interfaces.RoleRepository;
import com.poste.tn.interfaces.UtilisateurRepository;

import com.poste.tn.model.ERole;
import com.poste.tn.model.Role;
import com.poste.tn.model.Utilisateur;
import com.poste.tn.payload.request.SignupRequest;
import com.poste.tn.payload.response.MessageResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.util.*;


@RestController
public class UtilisateurController {

    @Autowired
    PasswordEncoder encoder;

    @GetMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui/index.html");

    }

    @Autowired
    UtilisateurRepository repository;

    @Autowired
    RoleRepository roleRepository;

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/user/find_all")
    //CORS is a security mechanism implemented by web browsers to restrict web page scripts from making
    // requests to a different domain than the one that served the web page.
    // It indicates whether the requested resource can be accessed by the client from a different origin.
    @CrossOrigin
    public List<Utilisateur> getAllUsers() {
        return repository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/user/add")
    @CrossOrigin
    public Utilisateur addUtilisateur(@RequestBody Utilisateur utilisateur) {
        return repository.save(utilisateur);
    }

    @GetMapping("/user/find-by-id/{text}")
    public Utilisateur findUserById(@PathVariable String text) {
        if (repository.findById(text).isPresent()) {
            return repository.findById(text).get();
        } else {
            return null;
        }
    }
    //Ou Bien

    @GetMapping("/user/find-by-id2/{id}")
    public ResponseEntity<String> findUserById2(@PathVariable String id) {
        if (repository.findById(id).isPresent()) {
            Utilisateur existingUser = repository.findById(id).get();
            return ResponseEntity.ok(existingUser.toString());
            //return repository.findById(text).get();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/users/find-by-matricule/{matricule}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Utilisateur> findUtilisateurByMatricule(@PathVariable String matricule) {
        Optional<Utilisateur> optionalUtilisateur = repository.findByMatricule(matricule);

        if (optionalUtilisateur.isPresent()) {

            Utilisateur existingUser = optionalUtilisateur.get();
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/users/exist/{matricule}")
    @CrossOrigin
    public ResponseEntity<?> seeIfUserExistsByMatricule(@PathVariable String matricule) {
        Optional<Utilisateur> optionalUtilisateur = repository.findByMatricule(matricule);

        if (optionalUtilisateur.isPresent()) {
            return ResponseEntity.ok(new MessageResponse("Exists", true));
        } else {
            return ResponseEntity.ok(new MessageResponse("Not existing", false));
//            return ResponseEntity.notFound().build();
        }

    }

    //    @PreAuthorize("hasRole('ROLE_ADMIN')")
//    @PostMapping("/user/update/{matricule}")
//    @CrossOrigin
//    public ResponseEntity updateUtilisateur(@PathVariable String matricule, @RequestBody Utilisateur updatedUser) {
//        Optional<Utilisateur> optionalUser = repository.findByMatricule(matricule);
//        if (optionalUser.isPresent()) {
//
//            Utilisateur user = optionalUser.get();
//            user.setMatricule(updatedUser.getMatricule());
//            user.setPassword(updatedUser.getPassword());
//            user.setNomFr(updatedUser.getNomFr());
//            user.setPrenomFr(updatedUser.getPrenomFr());
//            user.setNomArabe(updatedUser.getNomArabe());
//            user.setPrenomArabe(updatedUser.getPrenomArabe());
//            user.setCin(updatedUser.getCin());
//            //user.setRole(updatedUser.getRole());
//            user.setSiegeAdministratif(updatedUser.getSiegeAdministratif());
//            user.setAdministration(updatedUser.getAdministration());
//            user.setFonction(updatedUser.getFonction());
//            user.setTelephone(updatedUser.getTelephone());
//            user.setPhotoPath(updatedUser.getPhotoPath());
//            user.setFonction(updatedUser.getFonction());
//
//            repository.save(user);
//
//            return ResponseEntity.ok(user);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/user/delete/{matricule}")
    @CrossOrigin
    public ResponseEntity<Utilisateur> deleteElement(@PathVariable("matricule") String matricule) {
        Optional<Utilisateur> optionalUser = repository.findByMatricule(matricule);

        if (optionalUser.isPresent()) {
            Utilisateur existingEntity = optionalUser.get();
            repository.delete(existingEntity);

            return ResponseEntity.ok(existingEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/find-by-cin/{cin}")
    @CrossOrigin
    public ResponseEntity<String> findUserByCin(@PathVariable String cin) {
        repository.findByCin(cin);
        if (repository.findByCin(cin) != null) {
            Utilisateur existingUser = repository.findByCin(cin);
            return ResponseEntity.ok(existingUser.toString());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/me")
    @CrossOrigin
    public ResponseEntity<Utilisateur> userInfos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String matricule = userDetails.getUsername();

        Optional<Utilisateur> optionalUtilisateur = repository.findByMatricule(matricule);

        if (optionalUtilisateur.isPresent()) {

            Utilisateur existingUser = optionalUtilisateur.get();
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @GetMapping("/user/get-ip-address")
    @CrossOrigin
    public ResponseEntity<Map<String, String>> getUserIpAddress(HttpServletRequest request) {
        String ip = HttpReqRespUtils.getClientIpAddressIfServletRequestExist();
        Map<String, String> body = new HashMap<>();
        body.put("ip", ip);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    //trying update methode
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/user/modify/{matricule}")
    @CrossOrigin
    public ResponseEntity updateUtilisateur(@PathVariable String matricule, @RequestBody SignupRequest signUpRequest) {

        Optional<Utilisateur> optionalUser = repository.findByMatricule(matricule);

        if (optionalUser.isPresent()) {

            Utilisateur user = optionalUser.get();

            // check if matricule exists
            String mat = signUpRequest.getUsername();
            Optional<Utilisateur> checkUserExists = repository.findByMatricule(mat);
            if (checkUserExists.isPresent() && !matricule.equals(mat)) {
                Map<String, String> body = new HashMap<>();
                body.put("message", "Matricule exists in another user");
                body.put("status", "false");
                return ResponseEntity.ok(body);
            }

            user.setMatricule(signUpRequest.getUsername());
            user.setNomFr(signUpRequest.getNomFr());
            user.setPrenomFr(signUpRequest.getPrenomFr());
            user.setNomArabe(signUpRequest.getNomArabe());
            user.setPrenomArabe(signUpRequest.getPrenomArabe());
            user.setCin(signUpRequest.getCin());
            user.setSiegeAdministratif(signUpRequest.getSiegeAdministratif());
            user.setAdministration(signUpRequest.getAdministration());
            user.setFonction(signUpRequest.getFonction());
            user.setTelephone(signUpRequest.getTelephone());
            user.setPhotoPath(signUpRequest.getPhotoPath());
            user.setFonction(signUpRequest.getFonction());

            if (signUpRequest.getPassword() != null) {
                user.setPassword(encoder.encode(signUpRequest.getPassword()));
            }

            Set<String> strRoles = signUpRequest.getRoles();
            Set<Role> roles = new HashSet<>();
            if (strRoles == null) {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);
                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }

            user.setRoles(roles);
            repository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
