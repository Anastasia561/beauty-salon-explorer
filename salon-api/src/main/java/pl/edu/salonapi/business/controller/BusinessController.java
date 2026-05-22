package pl.edu.salonapi.business.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.salonapi.business.dto.BusinessInfoResponseDto;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.dto.BusinessUpdateRequestDto;
import pl.edu.salonapi.business.service.BusinessService;
import pl.edu.salonapi.wrapper.ResponseWrapper;

@RestController
@RequestMapping("/businesses")
@RequiredArgsConstructor
public class BusinessController {
    private final BusinessService businessService;

    @GetMapping
    public ResponseWrapper<Page<BusinessResponseDto>> findAll(Pageable pageable,
                                                              @RequestParam(required = false) String district,
                                                              @RequestParam(required = false) String service) {
        return ResponseWrapper.ok(businessService.findAllPageable(district, service, pageable));
    }

    @GetMapping("/{id}")
    public ResponseWrapper<BusinessInfoResponseDto> findById(@PathVariable Long id) {
        return ResponseWrapper.ok(businessService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseWrapper<Long> update(@PathVariable Long id,
                                        @RequestBody @Valid BusinessUpdateRequestDto dto) {
        return ResponseWrapper.ok(businessService.update(id, dto));
    }
}
