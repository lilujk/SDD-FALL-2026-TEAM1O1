package com.team1O1.api.User;

import org.springframework.web.bind.annotation.*;

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
        DateTime created) {}


    @PostMapping(path = "", consumes = "application/json")
    public void postUser(@PathVariable int id, @RequestBody User user){
        // TODO: implement
        UserView created = new UserView(100, "johnCola", "jc@gmail.com", "pass", "epic bio", NOW);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    //add thing in mapping to indicate it generates json
    @GetMapping(path = "/{id}")
    public void getUser(@PathVariable int id){
        // TODO: implement
         return new UserView(123, "JohnCola", "jc@gmail.com", "epic bio", NOW);
    }

    // @PatchMapping(path = "/{id}", consumes = "application/json")
    // public void updatUser(@PathVariable int id){
        
    // }
}
