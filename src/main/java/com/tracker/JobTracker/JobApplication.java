package com.tracker.JobTracker;
import java.time.LocalDateTime;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@SpringBootApplication
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String company;
    private String role;
    private String appliedDate;
    private String status;

    private LocalDateTime lastUpdated = LocalDateTime.now();

    @Column(length = 2000)
    private String notes;
}
