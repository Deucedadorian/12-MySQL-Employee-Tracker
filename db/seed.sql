INSERT INTO departments (name)
VALUES 
("engineering"),
("sales"), 
("management");

INSERT INTO roles (title, salary, department_id)
VALUES 
("engineer", 100000, 1), 
("sales", 95000, 2), 
("manager", 150000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Thomas", "Smith", 3, NULL), 
("Tom", "Smath", 1, 1), 
("Tim", "Smerth", 1, 1), 
("Sam", "Smeth", 2, 1);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;