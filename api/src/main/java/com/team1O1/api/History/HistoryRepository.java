package com.team1O1.api.History;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface HistoryRepository extends JpaRepository<History, Long> {

    // Has this user viewed this resource before?
    Optional<History> findByUserIdAndResourceId(Long userId, Long resourceId);

    // The user's 20 most recently viewed, newest first
    List<History> findTop20ByUserIdOrderByViewedDesc(Long userId);

    // Clear a user's history
    @Transactional
    void deleteByUserId(Long userId);
}