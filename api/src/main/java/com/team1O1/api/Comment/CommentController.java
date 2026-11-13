package com.team1O1.api.Comment;

import org.springframework.web.bind.annotation.*;

/**
 * Comments live on their own route, /api/v1/comment, instead of under /resource as in the API doc.
 *
 *   GET    /comment?resource={resourceID}   comments on a resource, oldest first
 *   GET    /comment/{commentID}             one comment
 *   POST   /comment                         { resource, comment }            (auth)
 *   DELETE /comment/{commentID}             author only                      (auth)
 *   PUT    /comment/{commentID}/like        body true/false -> new like count (auth)
 */
@RestController
//replace with link
//@RequestMapping("/api/comment")
public class CommentController {
    
    /** comments.parent_id is NOT NULL, top-level comments store 0. */
    public static final Integer NO_PARENT = 0L;
    private final CommentRepository comments;
    private final ResourceRepository resources;

    private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0, 0);


    // ---------- JSON shapes ----------

    /** "Comment" object from the API doc. `liked` is extra and only present when the viewer is known. */
    public record CommentView(
            @JsonProperty("ID") Integer id,
            Integer resource,
            Integer author,
            String comment,
            Integer likes,
            DateTime posted,
            @JsonInclude(JsonInclude.Include.NON_NULL) Boolean liked) {}

    /** Body of POST /comment. "resourceId" is accepted as another name for "resource". */
    public record CommentRequest(@JsonAlias("resourceId") Integer resource, String comment) {}

    public CommentController(CommentRepository comments, ResourceRepository resources) {
        this.comments = comments;
        this.resources = resources;
    }

    // ---------- routes ----------
    
    @PostMapping(path = "{userID}/resource/{id}/comment", consumes = "application/json")
    public void postComment(@PathVariable int id, @RequestBody Comment Comment){
        // TODO: implement
        CommentView created = new CommentView(100, body.resource(), 1, body.comment(), 0, NOW, false);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }  

    // /** DELETE /comment/{commentID}. Requires login; 403 unless you wrote the comment. */
    // @DeleteMapping("{userID}/resource/{id}/comment")
    // public ResponseEntity<Void> delete(@PathVariable("commentId") Integer commentId) {
    //     // TODO: implement
    //     return ResponseEntity.noContent().build();
    // }

    // @PostMapping(path = "/resource/{id}/comment/like", consumes = "application/json")
    // public void likeComment(@PathVariable int id, @RequestBody Comment Comment){

    // }  

}