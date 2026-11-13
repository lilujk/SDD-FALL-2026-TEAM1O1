package com.team1O1.api.Resource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.team1O1.api.User.UserController.UserView;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;

    private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0, 0);

    public record ResourceView(
            @JsonProperty("Id") Long id,
            @JsonProperty("title") String title,
            @JsonProperty("userId") Long userId,
            @JsonProperty("description") String description,
            @JsonProperty("link") String link,
            @JsonProperty("approved") boolean approved,
            @JsonProperty("free") Integer free,
            LocalDateTime created) {
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ResourceView> getResource(@PathVariable Long id) {
        // return "{\"Id\": 12345678,\"title\": \"Google
        // Fonts\",\"userId\":\"1\",\"description\":\"lovely
        // fonts\",\"link\":\"google_example.com\",\"approved\":\"true\",
        // \"free\":\"0\", \"created\":\"someTime\"}";
        Optional<Resource> r = resourceRepository.findById(id);
        if (r.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResourceView(-1L, "", -1L, "", "", false, 0, LocalDateTime.now()));
        }
        ResourceView rv = new ResourceView(r.get().getId(), r.get().getTitle(), r.get().getUserId(), r.get()
                .getDescription(), r.get().getLink(), r.get().getApproved(), r.get().getAccess(), r.get().getCreated());
        return ResponseEntity.status(HttpStatus.CREATED).body(rv);
    }

    @PostMapping(path = "/{id}", consumes = "application/json")
    public String postResource(@PathVariable long id, @RequestBody Resource resource) {
        // return "TODO: post resource";
        ResourceView created = new ResourceView(resource.getId(), resource.getTitle(), resource.getUserId(),
                resource.getDescription(), resource.getLink(), resource.getApproved(), resource.getAccess(), NOW);
        return "temp fix me";
    }

    // @PatchMapping(path = "/{id}", consumes = "application/json")
    // public String updateResource(@PathVariable long id, @RequestBody Resource
    // resource) {
    // return "TODO: update resource";
    // }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteResource(@PathVariable Long id) {
        if (!resourceRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found");
        }

        resourceRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Resource deleted");
    }

    // @PutMapping(path = "/{id}/like")
    // public String likeResource(@PathVariable long id) {
    // return "TODO: put resource like";
    // }

    // findById ->
    @GetMapping("/user/{userId}")
    public String findResourceByUser() {
        return "TODO";
    }

    @GetMapping("/tags/{tagName}")
    public String findResourceByTag() {
        return "TODO";
    }

    // Natalie - like resource

}
