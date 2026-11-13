package com.team1O1.api.SavedResource;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedResourcedRepository extends JpaRepository<SavedResource, Long>  {
      // Find a taggin by tag Id
    List<SavedResource> findByUserId(Long userId);
    // Find all taggings with a specific resource ID
}