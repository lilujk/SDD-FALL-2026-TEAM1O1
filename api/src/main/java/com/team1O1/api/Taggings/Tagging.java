package com.team1O1.api.Taggings;

import jakarta.persistence.*;

@Entity
@Table(
    name = "taggings"
)
public class Tagging {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long taggingId;

    @Column(name = "tag_id", nullable = false, updatable = false)
    private Long tagId;

    @Column(name = "resource_id", nullable = false, updatable = false)
    private Long resourceId;


    // Constructors
    public Tagging() {
    }

    public Tagging(Long tagId, Long resourceId) {
        this.tagId = tagId;
        this.resourceId = resourceId;
    }

    // Getters and Setters
    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long id) {
        this.tagId = id;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long id) {
        this.resourceId = id;
    }

}
