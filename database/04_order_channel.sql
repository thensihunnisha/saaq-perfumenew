-- Optional. Express also adds these columns automatically on the next order request.

USE saaq_perfume;

ALTER TABLE orders
  ADD COLUMN channel VARCHAR(32) NOT NULL DEFAULT 'checkout';

ALTER TABLE orders
  ADD COLUMN notes TEXT NULL;
