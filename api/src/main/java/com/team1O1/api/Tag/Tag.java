package com.team1O1.api.Tag;

import jakarta.persistence.*;

@Entity
@Table(
    name = "tags",
    uniqueConstraints = {
        @UniqueConstraint(name = "tags_unique", columnNames = "name")
    }
)
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Integer id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    @Column(name = "parent", nullable = false)
    private Integer parent;

    // Constructors
    public Tag() {
    }

    public Tag(String name, Integer parent) {
        this.name = name;
        this.parent = parent;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getParent() {
        return parent;
    }

    public void setParent(Integer parent) {
        this.parent = parent;
    }
}
