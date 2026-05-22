package pl.edu.salonapi.business.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import pl.edu.salonapi.business.dto.BusinessInfoResponseDto;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.dto.BusinessUpdateRequestDto;
import pl.edu.salonapi.business.mapper.BusinessMapper;
import pl.edu.salonapi.business.model.Business;
import pl.edu.salonapi.business.repository.BusinessRepository;
import pl.edu.salonapi.business.repository.BusinessSpecification;
import pl.edu.salonapi.district.model.District;
import pl.edu.salonapi.district.service.DistrictService;
import pl.edu.salonapi.service.model.ProvidedService;
import pl.edu.salonapi.service.service.ProvidedServiceService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;
    private final BusinessMapper businessMapper;
    private final DistrictService districtService;
    private final ProvidedServiceService providedServiceService;

    public Page<BusinessResponseDto> findAllPageable(String district, String serviceSearch, Pageable pageable) {
        Specification<Business> spec = Specification
                .where(BusinessSpecification.hasDistrict(district))
                .and(BusinessSpecification.searchByService(serviceSearch));

        return businessRepository.findAll(spec, pageable).map(businessMapper::toDto);
    }

    @Override
    public BusinessInfoResponseDto getById(long id) {
        return businessRepository.findById(id)
                .map(businessMapper::toInfoDto)
                .orElseThrow(() -> new EntityNotFoundException("Business not found"));
    }

    @Transactional
    @Override
    public long update(long id, BusinessUpdateRequestDto dto) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Salon not found with ID: " + id));

        businessMapper.updateBusinessFromDto(dto, business);

        District district = districtService.findById(dto.districtId());
        business.setDistrict(district);

        updateServices(dto.serviceIds(), business);

        businessRepository.save(business);
        return id;
    }

    private void updateServices(Set<Long> ids, Business business) {
        if (ids != null && !ids.isEmpty()) {
            List<ProvidedService> freshServices = providedServiceService.findAllByIds(ids);

            if (freshServices.size() != ids.size()) {
                Set<Long> foundIds = freshServices.stream()
                        .map(ProvidedService::getId)
                        .collect(Collectors.toSet());

                Set<Long> missingIds = new HashSet<>(ids);
                missingIds.removeAll(foundIds);

                throw new IllegalArgumentException("Target service IDs were not found: " + missingIds);
            }

            business.setServices(new HashSet<>(freshServices));
        } else {
            business.getServices().clear();
        }
    }
}