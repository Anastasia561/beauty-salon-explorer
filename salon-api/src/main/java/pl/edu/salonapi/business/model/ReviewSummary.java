package pl.edu.salonapi.business.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "review_summary")
public class ReviewSummary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "average_rating", nullable = false)
    private double avgRating;
    @Column(nullable = false)
    private int totalReviews;
    @OneToOne
    @JoinColumn(name = "business_id", nullable = false, unique = true)
    private Business business;
}
