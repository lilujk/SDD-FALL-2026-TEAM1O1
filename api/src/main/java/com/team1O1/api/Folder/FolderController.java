package com.team1O1.api.Folder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/user")
public class FolderController{
    @PostMapping(path = "/{id}/folder", consumes = "application/json")
    public void postFolder(@PathVariable int id, @RequestBody Folder folder){

    }  
    @GetMapping(path = "/{userId}/folder/{id}")
    public void getFolder(@PathVariable int userId, @PathVariable int id){

    } 

    @PatchMapping(path = "/{userId}/folder/{id}")
    public void updateFolder(@PathVariable int userId, @PathVariable int id){

    } 
}