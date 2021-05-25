DROP DATABASE IF EXISTS businessDB;
CREATE database businessDB;

USE businessDB;

CREATE TABLE employee (
    id INT PRIMARY KEY
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary VARCHAR(30),
    department_id INT,
);

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30),
);

SELECT * FROM ;
