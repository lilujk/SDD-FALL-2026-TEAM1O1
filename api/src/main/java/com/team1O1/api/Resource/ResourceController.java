package com.team1O1.api.Resource;

import org.springframework.web.bind.annotation.*;

@RestController
public class ResourceController {
    
    @GetMapping(path = "/resource/{id}")
    public void getResource(@PathVariable int id){

    }

    @PostMapping(path = "/resource/{id}")
    public void postResource(@PathVariable int id){

    }

    @PatchMapping(path = "/resource/{id}", consumes = "application/json")
    public void updateResource(@PathVariable int id, @RequestBody Resource resource){

    }

}
