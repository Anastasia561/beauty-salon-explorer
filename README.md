# Beauty Salon Explorer

**Beauty Salon Explorer** is a full-stack web application designed for discovering, updating, and managing beauty salon profiles.

---

## Features

### Pagination: 
- Efficient data retrieval using Spring Data Pageable

### Validation: 
- Strict input validation using jakarta.validation

### Multi-Step Profile Builder:
- Dynamic client-side form wizard handling multi-layered metadata streams without data loss between steps.
---

## Technologies Used

- **Backend:** Java 21, Spring Boot
- **Frontend:** React (Vite), React Hook Form, TanStack React Query, Bootstrap 5
- **Database:** PostgreSQL  
- **Build Tool:** Maven 
- **Containerization:** Docker
- **Documentation:** Swagger UI / OpenAPI 3

---

## Database schema

<img width="537" height="423" alt="Beauty_Salon_Explorer-2026-05-24_15-39" src="https://github.com/user-attachments/assets/2669ad34-03b7-498f-a71e-592f5898733b" />



## Database Optimization

To ensure high performance during filtering and relationship matching, the following database indexes are applied:

* `idx_businesses_district_id` (B-Tree) on the `business` table to optimize filtering salons by their operational district.
* `idx_business_services_business_id` and `idx_business_services_service_id` on the `business_service` join table to ensure fast relational joins when fetching or updating offered treatments.

## Getting started
1. clone repository: https://github.com/Anastasia561/beauty-salon-explorer
2. navigate to directory cd beauty-salon-explorer
3. run docker-compose up --build -d

## API documentation
Once the application is running, you can access the interactive Swagger documentation at:
http://localhost:8080/swagger-ui/index.html
