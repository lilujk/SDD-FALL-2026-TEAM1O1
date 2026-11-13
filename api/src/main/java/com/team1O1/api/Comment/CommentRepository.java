package com.team1O1.api.Folder;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByResourceId(Integer resourceId);
    List<Comment> findByUserId(Integer userId);
    List<Comment> findByParentId(Integer parentId);

}