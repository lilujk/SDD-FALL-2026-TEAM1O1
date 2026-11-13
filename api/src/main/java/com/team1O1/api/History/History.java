package com.team1O1.api.History;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "resource_id", nullable = false)
    private Long resourceId;

    @Column(name = "viewed", nullable = false)
    private LocalDateTime viewed;

    public History() {
    }

    public History(Long userId, Long resourceId) {
        this.userId = userId;
        this.resourceId = resourceId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public LocalDateTime getViewed() {
        return viewed;
    }

    public void setViewed(LocalDateTime viewed) {
        this.viewed = viewed;
    }
}