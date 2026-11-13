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
//@RequestMapping(ApiPaths.V1 + "/comment")
public class CommentController {
    
    /** comments.parent_id is NOT NULL, top-level comments store 0. */
    public static final long NO_PARENT = 0L;
    private final CommentRepository comments;
    private final ResourceRepository resources;

    // ---------- JSON shapes ----------

    /** "Comment" object from the API doc. `liked` is extra and only present when the viewer is known. */
    public record CommentView(
            @JsonProperty("ID") Long id,
            Long resource,
            Long author,
            String comment,
            long likes,
            Long posted,
            @JsonInclude(JsonInclude.Include.NON_NULL) Boolean liked) {}

    /** Body of POST /comment. "resourceId" is accepted as another name for "resource". */
    public record CommentRequest(@JsonAlias("resourceId") Long resource, String comment) {}

    public CommentController(CommentRepository comments, ResourceRepository resources) {
        this.comments = comments;
        this.resources = resources;
    }

    // ---------- routes ----------

    
    @PostMapping(path = "/resource/{id}/comment", consumes = "application/json")
    public void postComment(@PathVariable int id, @RequestBody Comment Comment){

    }  
    @PostMapping(path = "/resource/{id}/comment/like", consumes = "application/json")
    public void likeComment(@PathVariable int id, @RequestBody Comment Comment){

    }  
}

