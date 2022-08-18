/* Replace with your SQL commands */
CREATE TABLE orders (id serial PRIMARY KEY, product_id bigint REFERENCES products(id), user_id BIGINT REFERENCES users(id), quantity integer, status VARCHAR);