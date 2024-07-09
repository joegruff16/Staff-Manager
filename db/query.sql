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

-- Displays all employees, utilized aliases to properly include all columns
-- Alias: employee = worker, role = position, manager = supervisor
-- Received help from GitHub Copilot on this one
SELECT worker.first_name, worker.last_name, position.title AS role.title,
    CONCAT(supervisor.first_name, ' ', supervisor.last_name) AS ManagerFullName
FROM employee worker
LEFT JOIN employee supervisor ON worker.manager_id = supervisor.id
INNER JOIN role position ON worker.role_id = position.id
ORDER BY worker.last_name;

-- Add an employee
SELECT id FROM role WHERE title = $1;
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES($1, $2, $3, $4)

-- Update an employee role
UPDATE employee
SET role_id = (SELECT id FROM role WHERE title = 'HR Manager')
WHERE id = 4;