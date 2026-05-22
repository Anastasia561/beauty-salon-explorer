package pl.edu.salonapi.district.service;

import pl.edu.salonapi.district.dto.DistrictResponseDto;

import java.util.List;

public interface DistrictService {
    List<DistrictResponseDto> getAll();
}
