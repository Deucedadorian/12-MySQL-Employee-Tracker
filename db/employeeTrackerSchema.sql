DROP DATABASE IF EXISTS businessDB;
CREATE database businessDB;

USE businessDB;

CREATE TABLE departments (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
);  

CREATE TABLE roles (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary VARCHAR(30),
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int, 
    manager_id int, 
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);