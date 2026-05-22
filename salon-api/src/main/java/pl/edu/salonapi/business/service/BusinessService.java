package pl.edu.salonapi.business.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.edu.salonapi.business.dto.BusinessResponseDto;

public interface BusinessService {
    Page<BusinessResponseDto> findAllPageable(Pageable pageable);
}
