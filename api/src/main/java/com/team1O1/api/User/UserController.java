package com.team1O1.api.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.team1O1.api.SavedResource.SavedResource;
import com.team1O1.api.SavedResource.SavedResourcedRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import com.team1O1.api.History.History;
import com.team1O1.api.History.HistoryRepository;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private SavedResourcedRepository savedRepository;

    private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0, 0);

    /**
     * User. image is always null for now. created: seconds since the Unix epoch.
     * Passwords are never returned.
     */
    public record UserView(
            @JsonProperty("Id") Long id,
            @JsonProperty("username") String username,
            @JsonProperty("email") String email,
            @JsonProperty("password") String password,
            @JsonProperty("bio") String bio,
            LocalDateTime created) {
    }

    /** One entry in a user's viewing history. */
    public record HistoryItem(
            @JsonProperty("resourceId") Long resourceId,
            @JsonProperty("viewed") LocalDateTime viewed) {
    }

    /** Body of POST /user/{userId}/history. */
    public record HistoryRequest(Long resourceId) {
    }

    @PostMapping(path = "", consumes = "application/json")
    public ResponseEntity<String> postUser(@RequestBody User user) {
        // TODO: implement
        userRepository.save(user);
        // UserView created = new UserView(user.getId(), user.getUsername(),
        // user.getEmail(), user.getPassword(), user.getBio(), NOW);
        return ResponseEntity.status(HttpStatus.CREATED).body("ok");
    }

    // add thing in mapping to indicate it generates json
    @GetMapping(path = "/{id}")
    public ResponseEntity<UserView> getUser(@PathVariable Long id) {
        // TODO: implement
        Optional<User> u = userRepository.findById(id);
        if (u.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new UserView(-1l, "", "", "", "", LocalDateTime.now()));
        }
        UserView user = new UserView(u.get().getId(), u.get().getUsername(), u.get().getEmail(), u.get().getPassword(),
                u.get().getBio(), LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
        // return ResponseEntity.status(HttpStatus.CREATED).body("{\"Id\": 12345678,
        // \"username\":
        // \"JohnCola\",\"email\":\"someEmail@email.com\",\"password\":\"password\",\"bio\":\"awesome\",\"created\":\"someTime\"}");
    }

    @GetMapping(path = "{userId}/folder/{id}")
    public List<Long> getfolder(@PathVariable("id") Long id, @PathVariable ("userId") Long userId) {
        return savedRepository.findByUserId(userId).stream()
                .map(SavedResource::getResourceId)
                .toList();
    }

    // ---------- viewing history ----------

    // GET /user/{userId}/history -> [{ "resourceId": 5, "viewed":
    // "2026-11-13T09:40:00" }, ...] newest first, max 20
    @GetMapping(path = "/{userId}/history")
    public List<HistoryItem> getHistory(@PathVariable("userId") Long userId) {
        return historyRepository.findTop20ByUserIdOrderByViewedDesc(userId).stream()
                .map(h -> new HistoryItem(h.getResourceId(), h.getViewed()))
                .toList();
    }

    // POST /user/{userId}/history body: { "resourceId": 5 }
    // Call this when the user opens a resource page. Viewing the same resource
    // again moves it to the top.
    @PostMapping(path = "/{userId}/history", consumes = "application/json")
    public ResponseEntity<HistoryItem> addToHistory(@PathVariable("userId") Long userId,
            @RequestBody HistoryRequest body) {
        if (body == null || body.resourceId() == null) {
            return ResponseEntity.badRequest().build();
        }
        History h = historyRepository.findByUserIdAndResourceId(userId, body.resourceId())
                .orElseGet(() -> new History(userId, body.resourceId()));
        h.setViewed(LocalDateTime.now());
        History saved = historyRepository.save(h);
        return ResponseEntity.ok(new HistoryItem(saved.getResourceId(), saved.getViewed()));
    }

    // DELETE /user/{userId}/history -> clears the user's history
    @DeleteMapping(path = "/{userId}/history")
    public ResponseEntity<Void> clearHistory(@PathVariable("userId") Long userId) {
        historyRepository.deleteByUserId(userId);
        return ResponseEntity.noContent().build();
    }

    // @GetMapping("/tags/{tagName}")
    // public List<Long> findResourceByTag(@PathVariable("tagName") String tagName)
    // {
    // return resourceRepository.findIdsWithTags(List.of(tagName)).stream()
    // .map(Number::longValue)
    // .toList();
    // }
    // @PatchMapping(path = "/{id}", consumes = "application/json")
    // public void updatUser(@PathVariable int id){

    // }
}
