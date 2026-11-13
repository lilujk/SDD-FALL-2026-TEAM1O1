package com.team1O1.api.Taggings;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaggingsRepository extends JpaRepository<Tagging, Long>  {
      // Find a taggin by tag Id
    List<Tagging> findByTagId(Long tagId);
    // Find all taggings with a specific resource ID
    List<Tagging> findByResourceId(Long resourceId);
}
