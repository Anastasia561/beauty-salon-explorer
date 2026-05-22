package pl.edu.salonapi.business.dto;

public record BusinessResponseDto(
        long id,
        String name,
        String districtName,
        double avgRating,
        String priceRange
) {
}
