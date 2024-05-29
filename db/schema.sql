-- Create database and use the database with \c
DROP DATABASE IF EXISTS staff_manager;
CREATE DATABASE staff_manager;

\c staff_manager;

-- Create tables
    -- Create departments - create department schema and the seeds first
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
)

    -- Create roles
    -- Create employees - will reference the roles table and will have foreign keys for it's own table employees and for another employee row for the managers
-- Work next on the seeds.sql to create departments, roles, and then employees in the order we did above