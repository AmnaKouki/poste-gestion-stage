package com.poste.tn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
public class PosteApplication {

    public static void main(String[] args) {
        SpringApplication.run(PosteApplication.class, args);
    }


}
