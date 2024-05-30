// Packages used for this project are stored in variables below
const inquirer = require('inquirer')
// import any other packages here
const { Pool } = require('pg');


// https://node-postgres.com/features/pooling
// Use inquirer to capture user prompts to interact with Postgres database like the README generator

// Create a connection to the postgres database. Review examples from activities to create a connection string
// Connect to my database
const pool = new Pool(
    {
        user: 'josephruff',
        password: 'Raiders88',
        host: 'localhost',
        database: 'staff_manager',
        port: 5432
    },
    console.log(`Connected to staff_manager database.`)
)

pool.connect();
// Application logic

// Prompt the user asking them what they want to do using inquirer
inquirer
    .prompt([
        {

        }
    ])
// Examples:
// View department function and rinse and repeat for all of the tables
// Create a function here that will enable user to view all departments
const viewAllDepartments = async () => {
    try {
        // Connect to database
        const client = await pool.connect()
        // Get departments from database
        const department = await client.query(`select * from staff_manager`)
        console.log(department)

        // Create variables to store id and name
        const id = 0;
        const name = '';
        // Add a department
        const addDepartment = await client.query(`INSERT INTO department (${id}, ${name})
    VALUES (${id}, ${name});`)
        console.log(addDepartment)
    } catch (err) {
        console.error(error)
    }

}
viewAllDepartments();

// Create a function that will enable user to add a department
// Since department is the most simple create the schema, seeds, and the function for the departments. Then try with roles and lastly to the employees

