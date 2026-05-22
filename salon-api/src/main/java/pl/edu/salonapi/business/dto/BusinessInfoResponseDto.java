package pl.edu.salonapi.business.dto;

import pl.edu.salonapi.service.dto.ProvidedServiceResponseDto;

import java.util.Set;

public record BusinessInfoResponseDto(
        long id,
        String name,
        String districtName,
        String address,
        String phoneNumber,
        String websiteUrl,
        double avgRating,
        String priceRange,
        int totalReviews,
        Set<ProvidedServiceResponseDto> services
) {
}
