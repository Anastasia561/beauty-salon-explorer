package pl.edu.salonapi.service.service;

import pl.edu.salonapi.service.dto.ProvidedServiceResponseDto;
import pl.edu.salonapi.service.model.ProvidedService;

import java.util.List;
import java.util.Set;

public interface ProvidedServiceService {
    List<ProvidedServiceResponseDto> findAll();

    List<ProvidedService> findAllByIds(Set<Long> ids);
}
