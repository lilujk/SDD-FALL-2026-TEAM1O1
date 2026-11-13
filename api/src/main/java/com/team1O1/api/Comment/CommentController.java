package com.team1O1.api.Comment;

import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {
    @PostMapping(path = "/resource/{id}/comment", consumes = "application/json")
    public void postComment(@PathVariable int id, @RequestBody Comment Comment){

    }  
    @PostMapping(path = "/resource/{id}/comment/like", consumes = "application/json")
    public void likeComment(@PathVariable int id, @RequestBody Comment Comment){

    }  
}

