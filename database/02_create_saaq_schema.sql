-- =============================================================================
-- SAAQ Perfume — complete missing tables
-- File: database/02_create_saaq_schema.sql
--
-- The database already has a `products` table. This file does NOT drop it
-- and does NOT delete product rows.
--
-- Creates only the missing tables, seed data, and indexes.
-- Then run database/02a_migrate_products.sql to align products columns/FKs.
-- =============================================================================

USE saaq_perfume;

-- Inspect current state before creating anything
SHOW TABLES;
DESCRIBE products;

-- -----------------------------------------------------------------------------
-- Missing tables only. products is left untouched.
-- CREATE TABLE IF NOT EXISTS so this file can be re-run.
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'United Arab Emirates',
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM(
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',
    payment_status ENUM(
        'pending',
        'paid',
        'failed',
        'refunded'
    ) NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    status ENUM(
        'pending',
        'success',
        'failed',
        'refunded'
    ) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -----------------------------------------------------------------------------
-- Indexes (skip quietly if they already exist)
-- -----------------------------------------------------------------------------
SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'orders'
          AND INDEX_NAME = 'idx_orders_customer'
    ) = 0,
    'CREATE INDEX idx_orders_customer ON orders(customer_id)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'orders'
          AND INDEX_NAME = 'idx_orders_status'
    ) = 0,
    'CREATE INDEX idx_orders_status ON orders(status)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'orders'
          AND INDEX_NAME = 'idx_orders_created'
    ) = 0,
    'CREATE INDEX idx_orders_created ON orders(created_at)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'order_items'
          AND INDEX_NAME = 'idx_order_items_order'
    ) = 0,
    'CREATE INDEX idx_order_items_order ON order_items(order_id)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'order_items'
          AND INDEX_NAME = 'idx_order_items_product'
    ) = 0,
    'CREATE INDEX idx_order_items_product ON order_items(product_id)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'payments'
          AND INDEX_NAME = 'idx_payments_order'
    ) = 0,
    'CREATE INDEX idx_payments_order ON payments(order_id)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'payments'
          AND INDEX_NAME = 'idx_payments_status'
    ) = 0,
    'CREATE INDEX idx_payments_status ON payments(status)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- -----------------------------------------------------------------------------
-- Seed categories and collections only (no products)
-- -----------------------------------------------------------------------------
INSERT INTO categories (name, description)
SELECT 'Perfumes', 'Signature fragrances from SAAQ'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Perfumes'
);

INSERT INTO collections (name, description, image)
SELECT 'Takeoff', 'The SAAQ Takeoff Collection', '/images/collections/takeoff.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM collections WHERE name = 'Takeoff'
);

INSERT INTO collections (name, description, image)
SELECT 'Gems', 'The SAAQ Gems Collection', '/images/collections/gems.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM collections WHERE name = 'Gems'
);

-- -----------------------------------------------------------------------------
-- Verification
-- -----------------------------------------------------------------------------
SHOW TABLES;

SELECT COUNT(*) AS categories_count FROM categories;
SELECT COUNT(*) AS collections_count FROM collections;
SELECT COUNT(*) AS products_count FROM products;
SELECT COUNT(*) AS customers_count FROM customers;
SELECT COUNT(*) AS orders_count FROM orders;
SELECT COUNT(*) AS order_items_count FROM order_items;
SELECT COUNT(*) AS payments_count FROM payments;
