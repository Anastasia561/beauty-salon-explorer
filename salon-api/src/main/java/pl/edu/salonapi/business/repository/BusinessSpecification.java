package pl.edu.salonapi.business.repository;

import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import pl.edu.salonapi.business.model.Business;
import pl.edu.salonapi.district.model.District;
import pl.edu.salonapi.service.model.ProvidedService;

public class BusinessSpecification {

    public static Specification<Business> hasDistrict(String districtName) {
        return (root, query, cb) -> {
            if (!StringUtils.hasText(districtName)) return null;
            Join<Business, District> districtJoin = root.join("district");
            return cb.equal(cb.lower(districtJoin.get("name")), districtName.toLowerCase().trim());
        };
    }

    public static Specification<Business> searchByService(String serviceQuery) {
        return (root, query, cb) -> {
            if (!StringUtils.hasText(serviceQuery)) return null;
            Join<Business, ProvidedService> serviceJoin = root.join("services");

            query.distinct(true);

            String modernSearchTerm = "%" + serviceQuery.toLowerCase().trim() + "%";

            return cb.like(cb.lower(serviceJoin.get("name")), modernSearchTerm);
        };
    }
}