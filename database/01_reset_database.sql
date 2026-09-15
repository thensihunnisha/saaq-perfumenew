-- =============================================================================
-- SAAQ Perfume — database reset
-- File: database/01_reset_database.sql
--
-- This script only prepares an empty MySQL database.
-- It does NOT create products, customers, orders, or other ecommerce tables.
--
-- WARNING: DROP DATABASE permanently deletes the old `av` database and all
-- of its tables and data. Review before you run this in MySQL Workbench.
-- =============================================================================

-- 1. Remove the old database if it still exists
DROP DATABASE IF EXISTS av;

-- 2. Create a fresh SAAQ database
CREATE DATABASE saaq_perfume;

-- 3. Select the new database for the rest of this session
USE saaq_perfume;

-- 4. Confirm MySQL can see the new database
SHOW DATABASES;

-- 5. Confirm this session is using saaq_perfume
SELECT DATABASE();

-- 6. Confirm the new database has no tables
SHOW TABLES;
