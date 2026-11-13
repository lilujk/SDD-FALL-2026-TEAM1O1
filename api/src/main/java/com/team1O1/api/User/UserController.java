package com.team1O1.api.User;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/user")
public class UserController {

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

    }

    //add thing in mapping to indicate it generates json
    @GetMapping(path = "/{id}")
    public void getUser(@PathVariable int id){

    }

    @PatchMapping(path = "/{id}", consumes = "application/json")
    public void updatUser(@PathVariable int id){
        
    }
}
