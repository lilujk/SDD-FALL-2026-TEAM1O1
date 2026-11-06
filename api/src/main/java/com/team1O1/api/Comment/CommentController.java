package com.team1O1.api.Comment;

import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {
    @PostMapping(path = "/resource/{id}/comment", consumes = "application/json")
    public void postComment(@PathVariable int id, @RequestBody Comment Comment){

    }  
}
