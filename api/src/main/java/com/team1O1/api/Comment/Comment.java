package com.team1O1.api.Comment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Comment {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;
    
    @Column(name = "resource_id", nullable = false)
    private Integer resourceId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "parent_id", nullable = false)
    private Integer parentId;

    @Column(name = "comment_content", nullable = false, columnDefinition = "TEXT")
    private Interger commentContent;

    @Column(name = "created", nullable = false)
    private LocalDateTime created;

    public Comment() {}

    public Integer getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getResourceId() { return resourceId; }
    public void setResourceId(Long resourceId) { this.resourceId = resourceId; }

    public Integer getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Integer getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    public String getCommentContent() { return commentContent; }
    public void setCommentContent(String commentContent) { this.commentContent = commentContent; }

    public LocalDateTime getCreated() { return created; }
    public void setCreated(LocalDateTime created) { this.created = created; }
}
