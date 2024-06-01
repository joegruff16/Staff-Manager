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
// Prompt would list the options to view all departments, view all roles, etc. 
const start = async () => {
    await inquirer
        .prompt([
            {
                name: 'Choice',
                type: 'list',
                message: 'Please make a selection',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add a employee',
                    'Update an employee role'
                ]

            }
        ]).then(async (response) => {
            console.log(response);

            // Examples:
            // View department function and rinse and repeat for all of the tables
            // Create a function here that will enable user to view all departments
            const viewAllDepartments = async () => {
                try {
                    // Connect to database
                    const client = await pool.connect()
                    // Get departments from database
                    const department = await client.query(`select * from department`)
                    console.log(department.rows)
                } catch (err) {
                    console.error(err)
                }

            }
            if (response.Choice === 'View all departments') {
                await viewAllDepartments();
                console.log(response);
            }
            // Add similiar logic for remaining functions
            if (response.Choice === 'Add a department') {
                await addDepartment();
            }
        });


};

start();

// Create new function to addDepartment
const addDepartment = async () => {
    try {
        // Connect to database
        const client = await pool.connect()
        // Get departments from database
        const addNewDepartment = await client.query(`INSERT INTO department (id, name)
    VALUES (1, ('')`)
        console.log(addNewDepartment)
    } catch (err) {
        console.error(err)
    }

};


// Create a function that will enable user to add a department
// Since department is the most simple create the schema, seeds, and the function for the departments. Then try with roles and lastly to the employees

