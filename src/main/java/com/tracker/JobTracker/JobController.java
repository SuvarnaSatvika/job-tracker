package com.tracker.JobTracker;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {
    @Autowired
    private JobRepository repository;

    @GetMapping
    public List<JobApplication> getAll(){
        return repository.findAll();
    }

    @PostMapping
    public JobApplication create(@RequestBody JobApplication job){
        return repository.save(job);
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        long total = repository.count();
        long active = repository.countByStatusIn(Arrays.asList("Applied", "Interviewing", "Offer"));
        long rejected = repository.countByStatusIn(Arrays.asList("Rejected"));

        long responded = repository.countByStatusIn(Arrays.asList("Interviewing", "Offer", "Rejected"));

        int responseRate = 0;
        if (total>0){
            responseRate = (int) Math.round(((double) responded / total) * 100);
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("active", active);
        stats.put("rejected", rejected);
        stats.put("responseRate", responseRate);

        return stats;
    }
    
    @PutMapping("/{id}")
    public JobApplication updateApplication(@PathVariable Long id, @RequestBody JobApplication updatedJob) {
        return repository.findById(id).map(job -> {
            job.setCompany(updatedJob.getCompany());
            job.setRole(updatedJob.getRole());
            job.setAppliedDate(updatedJob.getAppliedDate());
            job.setStatus(updatedJob.getStatus());
            job.setNotes(updatedJob.getNotes());
            job.setLastUpdated(updatedJob.getLastUpdated());
            return repository.save(job);
        }).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id){
        repository.deleteById(id);;
    }




}
