package com.team1O1.api.Resource;

import org.springframework.web.bind.annotation.*;

@RestController
public class ResourceController {
    
    @GetMapping(path = "/resource/{id}")
    public void getResource(@PathVariable int id){

    }

    @PostMapping(path = "/resource/{id}", consumes = "application/json")
    public void postResource(@PathVariable int id, @RequestBody Resource resource){

    }

    @PatchMapping(path = "/resource/{id}", consumes = "application/json")
    public void updateResource(@PathVariable int id, @RequestBody Resource resource){

    }

    @DeleteMapping(path = "/resource/{id}")
    public void deleteResource(@PathVariable int id){

    }

    @PutMapping(path = "/resource/{id}/like")
    public void likeResource(@PathVariable int id){

    }
     
    
}
