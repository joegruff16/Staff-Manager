-- Department Table - shows all departments with name and ids
select * from department;

-- Add a department table
INSERT INTO department (name)

-- Displays all roles
select * from role;

-- Add a role
INSERT INTO role (title, salary, department_id)

-- Displays all employees
select * from employee;

-- Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)

-- Update an employee role
UPDATE employee
SET role_id = (SELECT id FROM role WHERE title = 'HR Manager')
WHERE id = 4;