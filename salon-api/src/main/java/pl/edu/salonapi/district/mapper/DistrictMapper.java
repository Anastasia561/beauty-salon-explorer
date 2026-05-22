package pl.edu.salonapi.district.mapper;

import org.mapstruct.Mapper;
import pl.edu.salonapi.district.dto.DistrictResponseDto;
import pl.edu.salonapi.district.model.District;

@Mapper(componentModel = "spring")
public interface DistrictMapper {

    DistrictResponseDto toDto(District district);
}
