CREATE INDEX idx_businesses_district_id ON business (district_id);
CREATE INDEX idx_business_services_business_id ON business_service (business_id);
CREATE INDEX idx_business_services_service_id ON business_service (service_id);