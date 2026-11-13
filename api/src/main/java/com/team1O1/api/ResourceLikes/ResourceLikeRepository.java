package com.team1O1.api.ResourceLikes;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceLikeRepository extends JpaRepository<ResourceLike, Long>  {
      // Find a taggin by tag Id
    List<ResourceLike> findByUserId(Long userId);
    // Find all taggings with a specific resource ID
    List<ResourceLike> findByResourceId(Long resourceId);

    @Query("select l from likes_resources l where l.resourceId = ?1 AND l.userId = ?2")
    List<ResourceLike> findByResourceIdAndUserId(Long resourceId, Long userId);
}