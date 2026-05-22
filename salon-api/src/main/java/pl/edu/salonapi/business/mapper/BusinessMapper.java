package pl.edu.salonapi.business.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.model.Business;

@Mapper(componentModel = "spring")
public interface BusinessMapper {

    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "reviewSummary.avgRating", target = "avgRating")
    BusinessResponseDto toDto(Business business);
}
