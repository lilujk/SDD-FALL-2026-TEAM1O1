package com.team1O1.api.Resource;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/resource")
public class ResourceController {
    
    @GetMapping(path = "/{id}")
    public String getResource(@PathVariable int id){
        return "TODO: get resource";
    }

    @PostMapping(path = "/{id}", consumes = "application/json")
    public String postResource(@PathVariable int id, @RequestBody Resource resource){
        return "TODO: post resource";

    }

    @PatchMapping(path = "/{id}", consumes = "application/json")
    public String updateResource(@PathVariable int id, @RequestBody Resource resource){
        return "TODO: update resource";
    }

    @DeleteMapping(path = "/{id}")
    public String deleteResource(@PathVariable int id){
        return "TODO: delete resource";
    }

    @PutMapping(path = "/{id}/like")
    public String likeResource(@PathVariable int id){
        return "TODO: put resource like";
    }
     
    @GetMapping (path ="/testing/{id}")
    public String testing(@PathVariable int id){
       return "testing id:"+id; 
    }
    
}
