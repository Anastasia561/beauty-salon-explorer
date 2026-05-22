package pl.edu.salonapi.service.mapper;

import org.mapstruct.Mapper;
import pl.edu.salonapi.service.dto.ProvidedServiceResponseDto;
import pl.edu.salonapi.service.model.ProvidedService;

@Mapper(componentModel = "spring")
public interface ProvidedServiceMapper {
    ProvidedServiceResponseDto toDto(ProvidedService providedService);
}
