package pl.edu.salonapi.service.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.salonapi.service.dto.ProvidedServiceResponseDto;
import pl.edu.salonapi.service.mapper.ProvidedServiceMapper;
import pl.edu.salonapi.service.repository.ProvidedServiceRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
class ProvidedServiceServiceImpl implements ProvidedServiceService {
    private final ProvidedServiceRepository repository;
    private final ProvidedServiceMapper mapper;

    @Override
    public List<ProvidedServiceResponseDto> findAll() {
        return repository.findAllByOrderByNameAsc()
                .stream()
                .map(mapper::toDto)
                .toList();
    }
}
