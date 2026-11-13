package com.team1O1.api.Comment;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByResourceId(Integer resourceId);
    List<Comment> findByUserId(Integer userId);
    List<Comment> findByParentId(Integer parentId);

}