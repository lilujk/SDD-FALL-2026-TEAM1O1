package com.team1O1.api.ResourceLikes;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ResourceLikeRepository extends JpaRepository<ResourceLike, Long> {

  // All likes by one user
  List<ResourceLike> findByUserId(Long userId);

  // All likes on one resource
  List<ResourceLike> findByResourceId(Long resourceId);

  // Has this user already liked this resource?
  boolean existsByResourceIdAndUserId(Long resourceId, Long userId);

  // Like count for a resource
  long countByResourceId(Long resourceId);

  // Unlike
  @Transactional
  void deleteByResourceIdAndUserId(Long resourceId, Long userId);
}