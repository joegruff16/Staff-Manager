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

// Examples:
// View department function and rinse and repeat for all of the tables
// Create a function here that will enable user to view all departments
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
// Can add all the rest of the functions below
async function exit() {
  await pool.end();
}
start();
