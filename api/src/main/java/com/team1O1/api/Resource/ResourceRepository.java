package com.team1O1.api.Resource;

import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * The `resources` table, plus its join tables via SQL queries:
 * `likes`, `taggings` / `warnings` / `medium` (labels, all pointing at
 * tags.id),
 * and clean-up of comments and saves when a resource is deleted.
 */
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    Resource findById(long id);

    List<Resource> findByUserId(long id);

}