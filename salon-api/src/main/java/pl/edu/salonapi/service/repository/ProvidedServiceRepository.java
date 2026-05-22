package pl.edu.salonapi.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.salonapi.service.model.ProvidedService;

import java.util.List;

public interface ProvidedServiceRepository extends JpaRepository<ProvidedService, Long> {
    List<ProvidedService> findAllByOrderByNameAsc();
}
