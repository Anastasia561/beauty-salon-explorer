package pl.edu.salonapi.business.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.salonapi.business.dto.BusinessResponseDto;
import pl.edu.salonapi.business.service.BusinessService;
import pl.edu.salonapi.wrapper.ResponseWrapper;

@RestController
@RequestMapping("/businesses")
@RequiredArgsConstructor
public class BusinessController {
    private final BusinessService businessService;

    @GetMapping
    public ResponseWrapper<Page<BusinessResponseDto>> findAll(Pageable pageable) {
        return ResponseWrapper.ok(businessService.findAllPageable(pageable));
    }
}
