package com.team1O1.api.SavedResource;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(
    name = "saved_resources"
)
public class SavedResource {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long like_resource_id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Column(name = "resource_id", nullable = false, updatable = false)
    private Long resourceId;

    @Column(name = "folder_id", nullable = false, updatable = false)
    private Long folderId;

    // @Column(name = "created", nullable = false)
    // private LocalDateTime created;
    

    // Constructors
    public SavedResource() {
    }

    public SavedResource(Long userId, Long resourceId, Long folderId) {
        this.userId = userId;
        this.resourceId = resourceId;
        this.folderId =folderId;
        // this.created = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getuserId() {
        return userId;
    }

    public void setuserId(Long id) {
        this.userId = id;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long id) {
        this.resourceId = id;
    }

}
