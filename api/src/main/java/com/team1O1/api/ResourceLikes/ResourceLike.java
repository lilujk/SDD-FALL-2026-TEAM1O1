package com.team1O1.api.ResourceLikes;


import jakarta.persistence.*;

@Entity
@Table(
    name = "likes_resources"
)
public class ResourceLike {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long like_resource_id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Column(name = "resource_id", nullable = false, updatable = false)
    private Long resourceId;


    // Constructors
    public ResourceLike() {
    }

    public ResourceLike(Long userId, Long resourceId) {
        this.userId = userId;
        this.resourceId = resourceId;
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
