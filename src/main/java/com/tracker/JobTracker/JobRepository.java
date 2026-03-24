package com.tracker.JobTracker;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<JobApplication, Long>{
    long countByStatus(String status);
    long countByStatusIn(List<String> statuses);   
}
