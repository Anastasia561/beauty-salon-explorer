package pl.edu.salonapi.business.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.util.Set;

public record BusinessUpdateRequestDto(
        @NotBlank(message = "Salon name cannot be empty")
        @Size(max = 100, message = "Salon name cannot exceed 100 characters")
        String name,

        @NotNull(message = "District ID is required")
        @Positive(message = "Invalid District ID")
        long districtId,

        @NotBlank(message = "Address cannot be empty")
        @Size(max = 255, message = "Address cannot exceed 255 characters")
        String address,

        @Pattern(
                regexp = "^(\\+48)?\\s?\\d{3}\\s?\\d{3}\\s?\\d{3}$|^$",
                message = "Invalid Polish phone number format"
        )
        String phoneNumber,

        @URL(message = "Invalid website URL format")
        String websiteUrl,

        @Min(value = 0, message = "Average rating cannot be less than 0.0")
        @Max(value = 5, message = "Average rating cannot exceed 5.0")
        double avgRating,

        @NotBlank(message = "Price range indicator is required")
        @Pattern(regexp = "^\\$+$", message = "Price range must match currency symbols (e.g., $, $$, $$$)")
        String priceRange,

        @PositiveOrZero(message = "Total reviews count cannot be negative")
        int totalReviews,

        @NotNull(message = "Services collection cannot be null")
        Set<@Positive(message = "Service IDs must be valid positive numbers") Long> serviceIds
) {
}