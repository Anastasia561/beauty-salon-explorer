package pl.edu.salonapi.district.service;

import pl.edu.salonapi.district.dto.DistrictResponseDto;
import pl.edu.salonapi.district.model.District;

import java.util.List;

public interface DistrictService {
    List<DistrictResponseDto> getAll();

    District findById(Long id);
}
