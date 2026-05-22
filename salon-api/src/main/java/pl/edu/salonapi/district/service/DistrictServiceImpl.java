package pl.edu.salonapi.district.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.salonapi.district.dto.DistrictResponseDto;
import pl.edu.salonapi.district.mapper.DistrictMapper;
import pl.edu.salonapi.district.model.District;
import pl.edu.salonapi.district.repository.DistrictRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
class DistrictServiceImpl implements DistrictService {
    private final DistrictRepository districtRepository;
    private final DistrictMapper districtMapper;

    @Override
    public List<DistrictResponseDto> getAll() {
        return districtRepository
                .findAllByOrderByNameAsc()
                .stream()
                .map(districtMapper::toDto)
                .toList();
    }

    @Override
    public District findById(Long id) {
        return districtRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("District not found"));
    }
}
