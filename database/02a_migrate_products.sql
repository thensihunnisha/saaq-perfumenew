-- =============================================================================
-- SAAQ Perfume — safe products table migration
-- File: database/02a_migrate_products.sql
--
-- Run AFTER database/02_create_saaq_schema.sql
--
-- Does NOT drop `products`.
-- Does NOT delete product rows.
-- Adds missing columns, then foreign keys and indexes if they are absent.
-- Existing product values (name, price, image, description, etc.) are kept.
--
-- New category_id values, if missing, are set to the Perfumes category
-- so the required foreign key can be added without removing rows.
-- =============================================================================

USE saaq_perfume;

-- Inspect the current products table first
SHOW TABLES;
DESCRIBE products;

-- Helper: add a column only when it does not exist
DROP PROCEDURE IF EXISTS saaq_add_column_if_missing;

DELIMITER $$
CREATE PROCEDURE saaq_add_column_if_missing(
    IN p_table VARCHAR(64),
    IN p_column VARCHAR(64),
    IN p_definition VARCHAR(1000)
)
BEGIN
    IF (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = p_table
          AND COLUMN_NAME = p_column
    ) = 0 THEN
        SET @ddl = CONCAT('ALTER TABLE `', p_table, '` ADD COLUMN ', p_definition);
        PREPARE stmt FROM @ddl;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;
END$$
DELIMITER ;

-- Add required products columns if they are missing.
-- category_id starts nullable so existing rows are not rejected.
CALL saaq_add_column_if_missing(
    'products',
    'name',
    'name VARCHAR(255) NOT NULL'
);

CALL saaq_add_column_if_missing(
    'products',
    'category_id',
    'category_id INT NULL'
);

CALL saaq_add_column_if_missing(
    'products',
    'collection_id',
    'collection_id INT NULL'
);

CALL saaq_add_column_if_missing(
    'products',
    'price',
    'price DECIMAL(10,2) NOT NULL DEFAULT 0.00'
);

CALL saaq_add_column_if_missing(
    'products',
    'image',
    'image VARCHAR(500) NULL'
);

CALL saaq_add_column_if_missing(
    'products',
    'description',
    'description TEXT NULL'
);

CALL saaq_add_column_if_missing(
    'products',
    'stock',
    'stock INT NOT NULL DEFAULT 0'
);

CALL saaq_add_column_if_missing(
    'products',
    'is_active',
    'is_active BOOLEAN NOT NULL DEFAULT TRUE'
);

CALL saaq_add_column_if_missing(
    'products',
    'created_at',
    'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
);

CALL saaq_add_column_if_missing(
    'products',
    'updated_at',
    'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
);

-- Ensure the Perfumes category exists, then attach any products that have
-- no category yet. Existing category_id values are left unchanged.
INSERT INTO categories (name, description)
SELECT 'Perfumes', 'Signature fragrances from SAAQ'
WHERE NOT EXISTS (
    SELECT 1 FROM categories WHERE name = 'Perfumes'
);

UPDATE products
SET category_id = (
    SELECT id FROM categories WHERE name = 'Perfumes' LIMIT 1
)
WHERE category_id IS NULL;

-- Now that every row has a category, require category_id
ALTER TABLE products
    MODIFY COLUMN category_id INT NOT NULL;

-- Add foreign keys only if they are missing
SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'products'
          AND CONSTRAINT_NAME = 'fk_products_category'
    ) = 0,
    'ALTER TABLE products ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT ON UPDATE CASCADE',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'products'
          AND CONSTRAINT_NAME = 'fk_products_collection'
    ) = 0,
    'ALTER TABLE products ADD CONSTRAINT fk_products_collection FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL ON UPDATE CASCADE',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Product indexes
SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'products'
          AND INDEX_NAME = 'idx_products_category'
    ) = 0,
    'CREATE INDEX idx_products_category ON products(category_id)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'products'
          AND INDEX_NAME = 'idx_products_collection'
    ) = 0,
    'CREATE INDEX idx_products_collection ON products(collection_id)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @sql = IF(
    (
        SELECT COUNT(*)
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = 'saaq_perfume'
          AND TABLE_NAME = 'products'
          AND INDEX_NAME = 'idx_products_active'
    ) = 0,
    'CREATE INDEX idx_products_active ON products(is_active)',
    'SELECT 1'
);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

DROP PROCEDURE IF EXISTS saaq_add_column_if_missing;

-- -----------------------------------------------------------------------------
-- Verification
-- -----------------------------------------------------------------------------
SHOW TABLES;
DESCRIBE products;

SELECT COUNT(*) AS categories_count FROM categories;
SELECT COUNT(*) AS collections_count FROM collections;
SELECT COUNT(*) AS products_count FROM products;
SELECT COUNT(*) AS customers_count FROM customers;
SELECT COUNT(*) AS orders_count FROM orders;
SELECT COUNT(*) AS order_items_count FROM order_items;
SELECT COUNT(*) AS payments_count FROM payments;
