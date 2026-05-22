package pl.edu.salonapi.service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.salonapi.service.dto.ProvidedServiceResponseDto;
import pl.edu.salonapi.service.service.ProvidedServiceService;
import pl.edu.salonapi.wrapper.ResponseWrapper;

import java.util.List;

@RestController
@RequestMapping("/services")
@RequiredArgsConstructor
public class ServiceController {
    private final ProvidedServiceService service;

    @GetMapping
    public ResponseWrapper<List<ProvidedServiceResponseDto>> findAll() {
        return ResponseWrapper.ok(service.findAll());
    }
}
