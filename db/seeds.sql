-- Department seeds
INSERT INTO department (name)
VALUES ('Skills and Development'),
       ('Human Resources'),
       ('Information Technology'),
       ('Management');

-- Role seeds
INSERT INTO role (title, salary, department_id)
VALUES ('Software Developer', 85000, 3),
         ('QA Analyst', 75000, 3),
         ('HR Generalist', 90000, 2),
         ('HR Specialist', 70000, 2),
         ('Training Specialist', 65000, 1),
         ('Development Specialist', 80000, 1),
         ('Training Manager', 85000, 4),
         ('HR Manager', 90000, 4),
         ('Product Manager', 110000, 4);

-- Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Shepard', 1, NULL),
       ('Jane', 'Shelby', 2, 1),
       ('Jim', 'Gregg', 3, 2),
       ('Jill', 'Torresdale', 4, 3),
       ('Frank', 'Criniti', 5, 4),
       ('Francesca', 'Marino', 6, 5),
       ('Alex', 'Gentry', 7, 6),
       ('Suzanne', 'Kalb', 8, 7),
       ('Brian', 'Peppers', 9, 8);
