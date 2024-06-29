// Packages used for this project are stored in variables below
const inquirer = require("inquirer");
// import any other packages here
const { Pool } = require("pg");

// https://node-postgres.com/features/pooling
// Use inquirer to capture user prompts to interact with Postgres database like the README generator

// Create a connection to the postgres database. Review examples from activities to create a connection string
// Connect to my database
const pool = new Pool(
  {
    user: "josephruff",
    password: "Raiders88",
    host: "localhost",
    database: "staff_manager",
    port: 5432,
  },
  console.log(`Connected to staff_manager database.`)
);

pool.connect();
// Application logic

// Prompt the user asking them what they want to do using inquirer
// Prompt would list the options to view all departments, view all roles, etc.
const start = async () => {
  await inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Please make a selection",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add a employee",
          "Update an employee role",
          "Exit", // Exit will become it's on function and not a while loop
        ],
      },
    ])
    .then(async (response) => {
      console.log(response);
      switch (response.choice) {
        case "View all departments":
          viewAllDepartments();
          break; // If you don't include a break it might execute another function or throw an error
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add a employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          exit(); // create a function with pool.end
          break;
      }
    });
};
// Create a function to view all roles

async function viewAllRoles() {
  try {
    // Connect to the database
    const client = await pool.connect();
    // Get roles from database
    const role = await client.query(`select * from role`);
    // Display roles in a table
    console.table(role.rows);
    start();
  } catch (err) {
    console.error(err);
  }
}

// Function that will display all employees

async function viewAllEmployees() {
  try {
    // Connect to the database
    const client = await pool.connect();
    // Get employees from the database
    const employee = await client.query(`select * from employee`);
    // Display employees in a table
    console.table(employee.rows);
    start();
  } catch (err) {
    console.error(err);
  }
}

// Create new function to addDepartment
async function addDepartment() {
  // try {
  inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message: "What is the name of the department you are adding?",
      },
    ])
    .then((response) => {
      console.log(response);
      // Connect to database
      // const client = pool.connect()
      pool.query(
        "Insert into department(name) values($1)",
        [response.addDepartment],
        (error) => {
          if (error) throw error;
          console.log("New Department has been added");
          start();
        }
      );
    });
}

// Function that allows users to add an employee
async function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message:
          "What is the first name of the employee you would like to add?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you would like to add?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role id of the employee you are adding?",
      },
      {
        name: "manager_id",
        type: "input",
        message:
          "What is the id of the department of the manager who will oversee this employee?",
      },
    ])
    .then((response) => {
      console.log(response);
      // Query to insert new employee into database
      pool.query(
        "Insert into employee(first_name, last_name, role_id, manager_id) values($1, $2, $3, $4)",
        [
          response.first_name,
          response.last_name,
          response.role_id,
          response.manager_id,
        ],
        // Error handling to pick up any errors if this doesn't work
        (error) => {
          if (error) throw error;
          console.log("New Employee has been added");
          // Output and invoke function
          start();
        }
      );
    });
}
// Function that allows users to add a role
async function addRole() {
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What is the title of the role you would like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the role you are adding?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department id for the role you are adding?",
      },
    ])
    .then((response) => {
      console.log(response);
      // Query to insert new role into database
      pool.query(
        "Insert into role(title, salary, department_id) values($1, $2, $3)",
        [response.addRole, response.salary, response.department_id],
        // Error handling to pick up any errors if this doesn't work
        (error) => {
          if (error) throw error;
          console.log("New role has been added");
          // Output and invoke function
          start();
        }
      );
    });
}

// Function  here that enables users to view all departments
async function viewAllDepartments() {
  try {
    // Connect to database
    const client = await pool.connect();
    // Get departments from database
    const department = await client.query(`select * from department`);
    console.table(department.rows);
    start();
  } catch (err) {
    console.error(err);
  }
}

async function exit() {
  await pool.end();
}
start();
