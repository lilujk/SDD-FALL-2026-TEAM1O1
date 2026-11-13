package com.team1O1.api.User;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/user")
public class UserController {
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
