package pl.edu.salonapi.service.service;

import pl.edu.salonapi.service.dto.ProvidedServiceResponseDto;

import java.util.List;

public interface ProvidedServiceService {
    List<ProvidedServiceResponseDto> findAll();
}
