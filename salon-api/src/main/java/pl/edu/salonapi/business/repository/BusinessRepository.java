package pl.edu.salonapi.business.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.edu.salonapi.business.model.Business;

public interface BusinessRepository extends JpaRepository<Business, Long>, JpaSpecificationExecutor<Business> {
}
