package pl.edu.salonapi.business.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.edu.salonapi.business.dto.BusinessInfoResponseDto;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.dto.BusinessUpdateRequestDto;

public interface BusinessService {
    Page<BusinessResponseDto> findAllPageable(String district, String service, Pageable pageable);

    BusinessInfoResponseDto getById(long id);

    long update(long id, BusinessUpdateRequestDto dto);
}
