package com.team1O1.api.ResourceLikes;

import jakarta.persistence.*;

@Entity
@Table(name = "likes_resources")
public class ResourceLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // was AUTO
    @Column(name = "like_resource_id")
    private Long id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Column(name = "resource_id", nullable = false, updatable = false)
    private Long resourceId;

    public ResourceLike() {
    }

    public ResourceLike(Long userId, Long resourceId) {
        this.userId = userId;
        this.resourceId = resourceId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }
}