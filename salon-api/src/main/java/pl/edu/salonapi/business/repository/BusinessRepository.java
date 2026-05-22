package pl.edu.salonapi.business.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.salonapi.business.model.Business;

public interface BusinessRepository extends JpaRepository<Business, Long> {
}
