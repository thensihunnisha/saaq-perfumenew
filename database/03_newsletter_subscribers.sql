-- SAAQ Perfume — newsletter list for the storefront footer
-- Does not modify products or existing commerce tables.

USE saaq_perfume;

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
