package com.team1O1.api.Folder;

import org.springframework.web.bind.annotation.*;

@RestController
public class FolderController{
    @PostMapping(path = "/user/{id}/folder", consumes = "application/json")
    public void postFolder(@PathVariable int id, @RequestBody Folder folder){

    }  
    @GetMapping(path = "/user/{userId}/folder/{id}")
    public void getFolder(@PathVariable int userId, @PathVariable int id){

    } 

    @PatchMapping(path = "/user/{userId}/folder/{id}")
    public void updateFolder(@PathVariable int userId, @PathVariable int id){

    } 
}