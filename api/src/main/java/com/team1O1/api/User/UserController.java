package com.team1O1.api.User;

import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @PostMapping(path = "/user", consumes = "application/json")
    public void postUser(@PathVariable int id, @RequestBody User user){

    }
}
