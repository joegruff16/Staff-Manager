// Packages used for this project are stored in variables below
const inquirer = require('inquirer');
const express = require('express');
const app = express();

// Create a variable to store our port establishing environment variables
const PORT = process.env.PORT || 3001


// Middleware
app.use(express.json());









// This is the port for the express server to run on
app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`))