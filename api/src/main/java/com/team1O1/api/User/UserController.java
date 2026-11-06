package com.team1O1.api.User;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @PostMapping(path = "/user", consumes = "application/json")
    public void postUser(@PathVariable int id, @RequestBody User user){

    }

    //add thing in mapping to indicate it generates json
    @GetMapping(path = "/user/{id}")
    public void getUser(@PathVariable int id){

    }

    @PatchMapping(path = "/user/{id}", consumes = "application/json")
    public void updatUser(@PathVariable int id){
        
    }
}
