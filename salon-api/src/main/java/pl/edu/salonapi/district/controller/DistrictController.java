package pl.edu.salonapi.district.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.salonapi.district.dto.DistrictResponseDto;
import pl.edu.salonapi.district.service.DistrictService;
import pl.edu.salonapi.wrapper.ResponseWrapper;

import java.util.List;

@RestController
@RequestMapping("/districts")
@Tag(name = "Districts", description = "Endpoints for managing districts")
@RequiredArgsConstructor
public class DistrictController {
    private final DistrictService districtService;

    @Operation(summary = "Endpoint for listing all available districts")
    @GetMapping
    public ResponseWrapper<List<DistrictResponseDto>> findAll() {
        return ResponseWrapper.ok(districtService.getAll());
    }
}
