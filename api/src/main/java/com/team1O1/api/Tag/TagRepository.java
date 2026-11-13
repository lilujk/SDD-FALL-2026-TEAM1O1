package com.team1O1.api.Tag;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

    // Find a tag by its name
    Optional<Tag> findByName(String name);

    // Check whether a tag exists by name
    boolean existsByName(String name);

    // Find all tags with a specific parent ID
    List<Tag> findByParent(Long parent);

}