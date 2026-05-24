package pl.edu.salonapi.service.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Services", description = "Endpoints for managing provided services")
@RequiredArgsConstructor
public class ServiceController {
    private final ProvidedServiceService service;

    @Operation(summary = "Endpoint for listing all available provided services")
    @GetMapping
    public ResponseWrapper<List<ProvidedServiceResponseDto>> findAll() {
        return ResponseWrapper.ok(service.findAll());
    }
}
