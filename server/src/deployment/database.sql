-- deployment/database.sql

CREATE TABLE contacts (
    id INT PRIMARY KEY IDENTITY(1,1),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    country VARCHAR(100),
    city VARCHAR(100),
    street VARCHAR(255),
    zipcode VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255)
);
