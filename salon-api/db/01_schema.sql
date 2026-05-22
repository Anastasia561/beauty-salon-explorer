-- Table: business
CREATE TABLE business
(
    id           bigserial    NOT NULL,
    name         varchar(100) NOT NULL,
    address      text         NOT NULL,
    phone_number varchar(50)  NOT NULL,
    website_url  varchar(255) NULL,
    price_range  varchar(5)   NOT NULL,
    updated_at   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    district_id  bigint       NOT NULL,
    CONSTRAINT business_pk PRIMARY KEY (id)
);

-- Table: business_service
CREATE TABLE business_service
(
    service_id  bigint NOT NULL,
    business_id bigint NOT NULL,
    CONSTRAINT business_service_pk PRIMARY KEY (service_id, business_id)
);

-- Table: district
CREATE TABLE district
(
    id   bigserial    NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT district_pk PRIMARY KEY (id)
);

-- Table: review_summary
CREATE TABLE review_summary
(
    id             bigserial     NOT NULL,
    average_rating decimal(3, 2) NOT NULL,
    total_reviews  int           NOT NULL,
    business_id    bigint        NOT NULL,
    CONSTRAINT review_summary_pk PRIMARY KEY (id)
);

-- Table: service
CREATE TABLE service
(
    id   bigserial    NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT service_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: business_district (table: business)
ALTER TABLE business
    ADD CONSTRAINT business_district
        FOREIGN KEY (district_id)
            REFERENCES district (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: business_service_business (table: business_service)
ALTER TABLE business_service
    ADD CONSTRAINT business_service_business
        FOREIGN KEY (business_id)
            REFERENCES business (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: business_service_service (table: business_service)
ALTER TABLE business_service
    ADD CONSTRAINT business_service_service
        FOREIGN KEY (service_id)
            REFERENCES service (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;

-- Reference: review_summary_business (table: review_summary)
ALTER TABLE review_summary
    ADD CONSTRAINT review_summary_business
        FOREIGN KEY (business_id)
            REFERENCES business (id)
            NOT DEFERRABLE
                INITIALLY IMMEDIATE
;
