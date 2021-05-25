DROP DATABASE IF EXISTS businessDB;
CREATE database businessDB;

USE businessDB;

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(30)
);  

CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary VARCHAR(30),
    department_id INT, 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int, 
    manager_id int, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES 
("engineering"),
("sales"), 
("management");

INSERT INTO role (title, salary, department_id)
VALUES 
("engineer", 100000, 1), 
("sales", 95000, 2), 
("manager", 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Thomas", "Smith", 3, NULL), 
("Tom", "Smath", 1, 1), 
("Tim", "Smerth", 1, 1), 
("Sam", "Smeth", 2, 1);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;