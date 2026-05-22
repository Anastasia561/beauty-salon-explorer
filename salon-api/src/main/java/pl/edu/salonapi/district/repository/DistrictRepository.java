package pl.edu.salonapi.district.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.salonapi.district.model.District;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findAllByOrderByNameAsc();
}
