package com.team1O1.api.User;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonProperty;


@RestController
@RequestMapping ("/user")
public class UserController {

    private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0, 0);

    /** User. image is always null for now. created: seconds since the Unix epoch. Passwords are never returned. */
    public record UserView(
        @JsonProperty("ID") Integer id, 
        String username, 
        String email,
        String password,
        String bio, 
        LocalDateTime created) {}


    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<UserView> postUser(@PathVariable int id, @RequestBody User user){
        // TODO: implement
        UserView created = new UserView(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), user.getBio(), NOW);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    //add thing in mapping to indicate it generates json
    @GetMapping(path = "/{id}")
    public ResponseEntity<UserView> getUser(@PathVariable int id){
        // TODO: implement
         UserView temp = new UserView(id, "JohnCola", "jc@gmail.com","pass", "epic bio", NOW);
         return ResponseEntity.status(HttpStatus.CREATED).body(temp);
    }

    // @PatchMapping(path = "/{id}", consumes = "application/json")
    // public void updatUser(@PathVariable int id){
        
    // }
}
