-- Use this command to start postgres in terminal
-- psql -h localhost -d postgres 
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
    CREATE TABLE role (
      id SERIAL PRIMARY KEY,
      title VARCHAR(30) UNIQUE NOT NULL,
      salary DECIMAL NOT NULL,
      department_id INTEGER NOT NULL
    )
    -- Create employees - will reference the roles table and will have foreign keys for it's own table employees and for another employee row for the managers
  CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER NOT NULL
  )
  -- Edit this to include the foreign keys