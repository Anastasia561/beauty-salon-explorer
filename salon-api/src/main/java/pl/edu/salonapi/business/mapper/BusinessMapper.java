package pl.edu.salonapi.business.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import pl.edu.salonapi.business.dto.BusinessInfoResponseDto;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.dto.BusinessUpdateRequestDto;
import pl.edu.salonapi.business.model.Business;
import pl.edu.salonapi.service.mapper.ProvidedServiceMapper;

@Mapper(componentModel = "spring", uses = {ProvidedServiceMapper.class})
public interface BusinessMapper {

    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "reviewSummary.avgRating", target = "avgRating")
    BusinessResponseDto toDto(Business business);

    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "reviewSummary.avgRating", target = "avgRating")
    @Mapping(source = "reviewSummary.totalReviews", target = "totalReviews")
    BusinessInfoResponseDto toInfoDto(Business business);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "district", ignore = true)
    @Mapping(target = "services", ignore = true)
    void updateBusinessFromDto(BusinessUpdateRequestDto dto, @MappingTarget Business business);
}
