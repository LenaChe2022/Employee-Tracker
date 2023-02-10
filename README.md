# Employee-Tracker

## Description

My motivation was to practice working with data base. My aim was to create interface (called **content management systems (CMS)**) that allow non-developers to easily view and interact with information stored in databases.
This is a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.
This application allows to to view and manage the departments, roles, and employees in the company.
During this project I learned how to work with database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To run this app follow steps:
* clone the repo to your computer;
* for using mysql in this app, enter yor uername and password in lines 15-17 of server.js file.
* to install all nesessary packages (MySQL2 package, Inquirer package,console.table package) enter in CLI:
* npm install
* to create Database open the db folder in your CLI and enter the following to run mySql:
* mysql -u root -p
* then enter your SQL password
* enter "sourse schema.sql" in mysql CLI to create working DataBase;
* then enter "source seeds.sql" in mysql CLI to put data to the DataBase.
* print "quit" to exit mySQL and come back to your CLI.
* The application will be invoked by using the following command in the Command line: node server.js.

## Usage

The following video shows an example of the application being used from the command line:


* GIVEN a command-line application that accepts user input
* WHEN I start the application
* THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
* THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
* THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
* THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
* THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
* THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
* THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
* THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Credits

N/A


## License
  
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
  (https://opensource.org/licenses/MIT)

## Tests

N/A

## Questions

My GitHub profile: https://github.com/LenaChe2022

With additional questions contact me by email:
lenache2022@gmail.com
