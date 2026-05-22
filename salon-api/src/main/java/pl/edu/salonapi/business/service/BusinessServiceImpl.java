package pl.edu.salonapi.business.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.mapper.BusinessMapper;
import pl.edu.salonapi.business.repository.BusinessRepository;

@Service
@RequiredArgsConstructor
class BusinessServiceImpl implements BusinessService {
    private final BusinessRepository businessRepository;
    private final BusinessMapper businessMapper;

    @Override
    public Page<BusinessResponseDto> findAllPageable(Pageable pageable) {
        return businessRepository.findAll(pageable).map(businessMapper::toDto);
    }
}
