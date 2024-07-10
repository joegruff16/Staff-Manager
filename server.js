// Packages used for this project are stored in variables below
const inquirer = require("inquirer");
const { Pool } = require("pg");

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

// This part of the code is the Application logic

// Below using inquier I will prompt the user asking them what they want to do
const start = async () => {
  await inquirer
    // This will prompt the user in the CLI displaying all these possibilities
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
      // This switch statement will allow the user to select an option and then execute the function that corresponds to that option
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
    const role =
      await client.query(`select role.title, role.salary, department.name AS department_name from role inner join department ON role.department_id = department.id
order by department.name, role.title;`);
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
    // Alias: employee = worker, role = position, manager = supervisor
    const employee =
      await client.query(`SELECT worker.first_name, worker.last_name, position.title AS role_title, CONCAT(supervisor.first_name, ' ', supervisor.last_name) AS Manager
      FROM employee worker
      LEFT JOIN employee supervisor ON worker.manager_id = supervisor.id
      INNER JOIN role position ON worker.role_id = position.id
      ORDER BY worker.last_name;`);
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
        name: "department_name",
        type: "list",
        message: "Choose the department that this role belongs to",
        choices: [
          "Skills and Development",
          "Human Resources",
          "Information Technology",
          "Management",
          "Quality Control",
          "Senior Management",
        ],
      },
    ])
    .then(async (response) => {
      try {
        // Query to retrieve department id based on department name
        const departmentQuery = "SELECT id FROM department WHERE name = $1";
        const departmentResults = await pool.query(departmentQuery, [
          response.department_name,
        ]);
        if (departmentResults.rows.length === 0) {
          throw new Error("Department not found");
        }
        const departmentId = departmentResults.rows[0].id;
        // Insert new role
        const insertQuery =
          "INSERT INTO role (title, salary, department_id) VALUES($1, $2, $3)";
        await pool.query(insertQuery, [
          response.addRole,
          response.salary,
          departmentId,
        ]);
        console.log("new role has been added");
        // Output and invoke function
        start();
      } catch (error) {
        console.error("Error adding role:", error);
      }
    });
}
// Function that will search for roles in the database
async function searchRoles() {
  const query = "SELECT id, title AS name FROM role";
  try {
    const result = await pool.query(query);
    const roles = result.rows.map((row) => ({ name: row.name, value: row.id }));
    return roles;
  } catch (error) {
    console.error("Error searching roles:", error);
    throw error;
  }
}
// Function that will search for managers in the database
async function searchManagers() {
  const query =
    "SELECT id, first_name || ' ' || last_name AS name from employee WHERE manager_id IS NOT NULL";
  try {
    const result = await pool.query(query);
    const managers = result.rows.map((row) => ({
      name: row.name,
      value: row.id,
    }));
    return managers;
  } catch (error) {
    console.error("Error finding managers:", error);
    throw error;
  }
}
// Function that allows users to add an employee
async function addEmployee() {
  // Db.search to pull in all of the roles with the name and id
  const roles = await searchRoles();
  const roleOptions = roles.map((role) => ({
    name: role.name,
    value: role.id,
  }));

  // Db.search employees table to pull in all of the managers with name and id
  const managers = await searchManagers();
  const managerOptions = managers.map((manager) => ({
    name: manager.name,
    value: manager.id,
  }));

  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you are going to add?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you are adding?",
      },
      {
        name: "role_title",
        type: "list",
        message: "Which role does the employee you are adding have?",
        choices: roleOptions,
      },
      {
        name: "manager",
        type: "list",
        message: "Who is the manager of the employee you are adding?",
        choices: managerOptions,
      },
    ])
    .then(async (response) => {
      try {
        // This will find the selected role_id based on the user's selection
        const selectedRole = roleOptions.find(
          (option) => option.name && option.id === response.role
        );
        if (selectedRole) {
          const selectedRoleId = selectedRole.value;
          console.log(selectedRoleId);
        } else {
          console.log("Selected Role not found");
        }

        // This will then find the selected manager_id based on the user's selection
        const selectedManager = managerOptions.find(
          (option) => option.name && option.id === response.manager
        );
        if (selectedManager) {
          const selectedManagerId = selectedManager.value;
          console.log(selectedManagerId);
        } else {
          console.log("Selected Manager not found");
        }
      } catch (error) {
        console.error("Error", error);
      }

      // Insert new employee

      const insertQuery =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)";
      await pool.query(insertQuery, [
        response.first_name,
        response.last_name,
        response.role_title,
        response.manager,
      ]);
      console.log("new employee has been added");
      // Output and invoke function
      start();
    });
}
// } catch (error) {
//   console.error("Error adding employee:", error);
// }

// Function that allows a user to update an employee role
async function updateEmployeeRole() {
  inquirer.prompt([{}]);
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
