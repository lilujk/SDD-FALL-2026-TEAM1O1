package com.team1O1.api.Folder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/user")
public class FolderController{

    private static final LocalDateTime NOW = LocalDateTime.of(2025, 11, 13, 0, 0);


    /** Folder. contents: IDs of the saved resources. created: seconds since the Unix epoch. */
    public record FolderView(
            @JsonProperty("ID") Integer id,
            Integer creator,
            String title,
            List<Integer> contents,
            DateTime created) {}

    @PostMapping(path = "/{userId}/folder", consumes = "application/json")
    public void postFolder(@PathVariable int userId, @RequestBody Folder folder){

    }  
    @GetMapping(path = "/{userId}/folder/{id}")
    public void getFolder(@PathVariable int userId, @PathVariable int id){
        // TODO: implement
        return List.of(
                new FolderView(1, creatorId, "Midterm prep", "Everything for the Nov midterm", List.of(1, 2), NOW - 604800),
                new FolderView(2, creatorId, "Read later", null, List.of(3), NOW - 86400));
   
    } 

    @PatchMapping(path = "/{userId}/folder/{id}")
    public void updateFolder(@PathVariable int userId, @PathVariable int id){
        
    } 

     /** DELETE /folder/{folderID}. Requires login; 403 unless you created the folder. */
    @DeleteMapping("/{userId}/folder/{id}")
    public ResponseEntity<Void> delete(@PathVariable("folderId") Integer folderId) {
        // TODO: implement
        return ResponseEntity.noContent().build();
    }

}