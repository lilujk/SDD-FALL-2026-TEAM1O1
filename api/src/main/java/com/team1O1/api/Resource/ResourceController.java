package com.team1O1.api.Resource;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @GetMapping(path = "/{id}")
    public String getResource(@PathVariable long id) {
        return "{\"Id\": 12345678,\"title\": \"Google Fonts\",\"userId\":\"1\",\"description\":\"lovely fonts\",\"link\":\"google_example.com\",\"approved\":\"true\", \"free\":\"0\", \"created\":\"someTime\"}";

    }

    // @PostMapping(path = "/{id}", consumes = "application/json")
    // public String postResource(@PathVariable long id, @RequestBody Resource
    // resource) {
    // return "TODO: post resource";

    // }

    // @PatchMapping(path = "/{id}", consumes = "application/json")
    // public String updateResource(@PathVariable long id, @RequestBody Resource
    // resource) {
    // return "TODO: update resource";
    // }

    // @DeleteMapping(path = "/{id}")
    // public String deleteResource(@PathVariable long id) {
    // return "TODO: delete resource";
    // }

    // @PutMapping(path = "/{id}/like")
    // public String likeResource(@PathVariable long id) {
    // return "TODO: put resource like";
    // }

    // @GetMapping(path = "/testing/{id}")
    // public String testing(@PathVariable long id) {
    // return "testing id:" + id;
    // }

}
