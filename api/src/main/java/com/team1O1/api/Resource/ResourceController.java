package com.team1O1.api.Resource;

import com.team1O1.api.Tag.*;
import com.team1O1.api.History.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.team1O1.api.ResourceLikes.ResourceLike;
import com.team1O1.api.ResourceLikes.ResourceLikeRepository;
import com.team1O1.api.SavedResource.SavedResource;
import com.team1O1.api.SavedResource.SavedResourcedRepository;
import com.team1O1.api.Taggings.TaggingsRepository;
import com.team1O1.api.User.User;
import com.team1O1.api.User.UserRepository;
import com.team1O1.api.User.UserController.UserView;

@RestController
@RequestMapping("/resource")
public class ResourceController {

    @Autowired
    private ResourceRepository resourceRepository;
    private TagRepository tagRepository;
    private UserRepository userRepository;
    @Autowired
    private HistoryRepository historyRepository;

    private ResourceView toView(Resource r) {
        return new ResourceView(r.getId(), r.getTitle(), r.getUserId(), r.getDescription(),
                r.getLink(), Boolean.TRUE.equals(r.getApproved()), r.getAccess(), r.getCreated());
    }

    @Autowired
    private TaggingsRepository taggingsRepository;

    @Autowired
    private ResourceLikeRepository resourceLikeRepository;

    @Autowired
    private SavedResourcedRepository savedRepository;

    // private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0,
    // 0);

    public record ResourcePatch(String title, String description, String link, Integer free) {
    }

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

    public record ResourceList(
            @JsonProperty("resourceId") List<Long> resourceId) {
    }

    /** Body of POST /resource/{id}/like. Temporary until login is wired up. */
    public record LikeRequest(Long userId) {
    }

    // array of ids
    @GetMapping(path = "/ids")
    public List<Long> getAllResourceIds() {
        return resourceRepository.findAll().stream()
                .map(Resource::getId)
                .toList();
    }

    // // find by id ****OLD
    @GetMapping(path = "/{id}")
    public ResponseEntity<ResourceView> getResource(@PathVariable Long id) {
    Optional<Resource> r = resourceRepository.findById(id);
    if (r.isEmpty()) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
    .body(new ResourceView(-1L, "", -1L, "", "", false, 0, LocalDateTime.now()));
    }
    ResourceView rv = new ResourceView(r.get().getId(), r.get().getTitle(),
    r.get().getUserId(), r.get()
    .getDescription(), r.get().getLink(), r.get().getApproved(),
    r.get().getAccess(), r.get().getCreated());
            if (r.get().getUserId() != null) {
            recordView(r.get().getUserId(), id);
        }
    return ResponseEntity.status(HttpStatus.CREATED).body(rv);
    }
    // @GetMapping("/{id}")
    // public ResponseEntity<ResourceView> getResource(@PathVariable("id") Long id,
    //         @RequestParam(name = "userId", required = false) Long userId) {
    //     Optional<Resource> found = resourceRepository.findById(id);
    //     if (found.isEmpty()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     if (userId != null) {
    //         recordView(userId, id);
    //     }
    //     return ResponseEntity.ok(toView(found.get()));
    // }

    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<String> postResource(@RequestBody Resource resource) {
        // return "TODO: post resource";
        resourceRepository.save(resource);
        return ResponseEntity.status(HttpStatus.CREATED).body("ok");
    }

    // PATCH /resource/{id} -> 200 with the updated resource, 404 if it doesn't
    // exist
    @PatchMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<ResourceView> updateResource(@PathVariable("id") Long id,
            @RequestBody ResourcePatch patch) {
        Optional<Resource> found = resourceRepository.findById(id);
        if (found.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Resource r = found.get();

        if (patch.title() != null)
            r.setTitle(patch.title());
        if (patch.description() != null)
            r.setDescription(patch.description());
        if (patch.link() != null)
            r.setLink(patch.link());
        if (patch.free() != null)
            r.setAccess(patch.free());

        Resource saved = resourceRepository.save(r);
        return ResponseEntity.ok(toView(saved));
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

    // findByuserId ->
    @GetMapping("/user/{userId}")
    public List<Long> findResourceByUser(@PathVariable("userId") Long userId) {
        return resourceRepository.findByUserId(userId).stream()
                .map(Resource::getId)
                .toList();
    }

    @GetMapping("/author/{name}")
    public List<Long> findResourceByAuthor(@PathVariable("name") String name) {
        List<User> l = userRepository.findByUsername(name);
        if (l.size()==0){
            return List.of();
        }
        return resourceRepository.findByUserId(l.getFirst().getId()).stream()
                .map(Resource::getId)
                .toList();
    }

    @GetMapping("/price/{price}")
    public ResponseEntity<String> filterByPrice(int price) {
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    // GET /resource/tags/{tagName} -> [1, 4, 9] : IDs of every resource with that
    // tag ([] if none)
    @GetMapping("/tags/{tagName}")
    public List<Long> findResourceByTag(@PathVariable("tagName") String tagName) {
        return resourceRepository.findIdsWithTags(List.of(tagName)).stream()
                .map(Number::longValue)
                .toList();
    }

    /**
     * Adds the resource to the user's history, or moves it to the top if it's
     * already there.
     */
    private void recordView(Long userId, Long resourceId) {
        History h = historyRepository.findByUserIdAndResourceId(userId, resourceId)
                .orElseGet(() -> new History(userId, resourceId));
        h.setViewed(LocalDateTime.now());
        historyRepository.save(h);
    }

    // POST /resource/{id}/like body: { "userId": 1 } -> 200 with the new like
    // count, 404 if no such resource
    @PostMapping("/{id}/like")
    public ResponseEntity<Long> likeResource(@PathVariable("id") Long id, @RequestBody LikeRequest body) {
        if (!resourceRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        if (!resourceLikeRepository.existsByResourceIdAndUserId(id, body.userId())) { // no double-likes
            resourceLikeRepository.save(new ResourceLike(id, body.userId()));
        }
        else{
            resourceLikeRepository.deleteByResourceIdAndUserId(id, body.userId());
        }
        return ResponseEntity.ok(resourceLikeRepository.countByResourceId(id));
    }

    // DELETE /resource/{id}/like?userId=1 -> 200 with the new like count
    // @DeleteMapping("/{id}/like")
    // public ResponseEntity<Long> unlikeResource(@PathVariable("id") Long id, @RequestParam("userId") Long userId) {
    //     if (!resourceRepository.existsById(id)) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     resourceLikeRepository.deleteByResourceIdAndUserId(id, userId);
    //     return ResponseEntity.ok(resourceLikeRepository.countByResourceId(id));
    // }

    @PostMapping("/{id}/save")
    public ResponseEntity<String> saveResource(@PathVariable("id") Long id, @RequestBody SavedResource resource) {
        savedRepository.save(resource);
        return ResponseEntity.ok("resource saved");

    }
    // Natalie - like resource

}
