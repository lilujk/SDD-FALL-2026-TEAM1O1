package com.team1O1.api.User;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;


@RestController
@RequestMapping ("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0, 0);

    /** User. image is always null for now. created: seconds since the Unix epoch. Passwords are never returned. */
    public record UserView(
        @JsonProperty("Id") Long id, 
        @JsonProperty("username") String username, 
        @JsonProperty("email") String email,
        @JsonProperty("password") String password,
        @JsonProperty("bio") String bio, 
        LocalDateTime created) {}


    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<String> postUser(@PathVariable int id, @RequestBody User user){
        // TODO: implement
        userRepository.save(user);
        // UserView created = new UserView(user.getId(), user.getUsername(), user.getEmail(), user.getPassword(), user.getBio(), NOW);
        return ResponseEntity.status(HttpStatus.CREATED).body("");
    }

    //add thing in mapping to indicate it generates json
    @GetMapping(path = "/{id}")
    public ResponseEntity<UserView> getUser(@PathVariable Long id){
        // TODO: implement
        Optional<User> u = userRepository.findById(id);
        if (u.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new UserView(-1l,"","","","", LocalDateTime.now()));
        }
         UserView user = new UserView(u.get().getId(), u.get().getUsername(), u.get().getEmail(),u.get().getPassword(), u.get().getBio(), LocalDateTime.now());
         return ResponseEntity.status(HttpStatus.CREATED).body(user);
        //  return ResponseEntity.status(HttpStatus.CREATED).body("{\"Id\": 12345678, \"username\": \"JohnCola\",\"email\":\"someEmail@email.com\",\"password\":\"password\",\"bio\":\"awesome\",\"created\":\"someTime\"}");
    }

    // @PatchMapping(path = "/{id}", consumes = "application/json")
    // public void updatUser(@PathVariable int id){
        
    // }
}
