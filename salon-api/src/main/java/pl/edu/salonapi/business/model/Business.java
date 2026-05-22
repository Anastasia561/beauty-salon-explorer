package pl.edu.salonapi.business.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import pl.edu.salonapi.district.model.District;
import pl.edu.salonapi.service.model.ProvidedService;

import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "business")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @Column(length = 50, nullable = false)
    private String phoneNumber;

    @Column
    private String websiteUrl;

    @Column(length = 5, nullable = false)
    private String priceRange;

    @ManyToMany
    @JoinTable(
            name = "business_service",
            joinColumns = @JoinColumn(name = "business_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private Set<ProvidedService> services;

    @OneToOne(mappedBy = "business", cascade = CascadeType.ALL)
    private ReviewSummary reviewSummary;
}
