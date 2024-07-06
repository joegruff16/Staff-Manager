-- Department Table - shows all departments with name and ids
-- Review departments first and understand it then review roles. Because there are less relationships than with employees
select * from department;

-- Add a department table
INSERT INTO department (name)

-- Displays all roles
SELECT role.title, role.salary, department.name AS department_name
FROM role
INNER JOIN department ON role.department_id = department.id
ORDER BY department.name, role.title;

-- Add a role
SELECT id FROM department WHERE name = $1;
INSERT INTO role (title, salary, department_id) 
VALUES($1, $2, $3)

-- Displays all employees
-- Received help from GitHub Copilot on this one
SELECT 
    e.first_name AS EmployeeFirstName, 
    e.last_name AS EmployeeLastName, 
    CONCAT(m.first_name, ' ', m.last_name) AS ManagerFullName
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
INNER JOIN role r ON e.role_id = r.id
ORDER BY e.last_name;

-- Add an employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES($1, $2, $3, $4)

-- Update an employee role
UPDATE employee
SET role_id = (SELECT id FROM role WHERE title = 'HR Manager')
WHERE id = 4;