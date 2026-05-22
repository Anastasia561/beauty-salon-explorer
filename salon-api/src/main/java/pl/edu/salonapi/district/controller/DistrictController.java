package pl.edu.salonapi.district.controller;

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
@RequiredArgsConstructor
public class DistrictController {
    private final DistrictService districtService;

    @GetMapping
    public ResponseWrapper<List<DistrictResponseDto>> findAll() {
        return ResponseWrapper.ok(districtService.getAll());
    }
}
