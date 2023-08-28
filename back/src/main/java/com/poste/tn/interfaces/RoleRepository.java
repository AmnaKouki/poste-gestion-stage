package com.poste.tn.interfaces;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.poste.tn.model.Role;
import com.poste.tn.model.ERole;


public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}







