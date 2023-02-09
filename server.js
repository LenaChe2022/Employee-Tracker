
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // password here
    password: 'thunderer!1',
    database: 'employees_db'
  },
  console.log(`Connected to the employees database.`)
);


//Show department's name and id
function viewDepartments(){
    const sql = `SELECT name AS department_name, id AS department_id FROM department;`;
    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        console.log('\n');
        console.table(rows);
        startFunction();       
      });
};

//Show Roles in a special selection
function viewRoles(){
    const sql = `SELECT role.title AS job_title, role.id AS role_id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        console.log('\n');
        console.table(rows);
        startFunction();       
      });
};

//Show formated employee table
function viewEmployees(){
    const sql = `SELECT employee.id AS employee_id, first_name, last_name, role.title AS job_title, department.name AS department, role.salary AS salary, manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        console.log('\n');
        console.table(rows);
        startFunction();  
      });
};

//Add a new department
function addDepartment(){
    const sql = `INSERT INTO department (name) VALUES (?);`;
    inquirer
         .prompt([
            {type: "input",
            message: "Enter the name of the Department you want to add",
            name: "department"
        }
         ])
         .then((data) => {
            if (!data.department){
                console.log("\nYou need to input the name of Department\n");
                addDepartment();
                //quit();
            } else {
                params = data.department;
                db.query(sql, params, (err, rows) => {
                    if (err) {
                     console.error(err);
                       return;
                    }
                    console.log('\nDepartment added\n'); 
                    startFunction();
                  });
            };
         });
         
};

// Get actual list of departments for prompt
function getDepartmentsForRole(){
    const sql = `SELECT name, id FROM department;`;
    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        addNewRole(rows);     
      });
};


//Get info for a new role
function addNewRole(array){
    const allDepartmentArray = array;    
    let choicesArray = [];
    allDepartmentArray.forEach(element => 
        choicesArray.push(element.name));

    inquirer
    .prompt([
       {type: "input",
       message: "Enter the role you want to add",
       name: "roleName"
       },
       {type: "input",
       message: "Enter the salary for that role",
       name: "salary"
       },
       {type:"list",
       message: "Choose the department",
       choices: choicesArray,
       name: "department",
       }
    ]).then((data) => {
        for (let i = 0; i < allDepartmentArray.length; i++) {
            if (data.department === allDepartmentArray[i].name) {
                const depId = allDepartmentArray[i].id;
                createNewRole(data.roleName, data.salary, depId);
            };  
        };
    });
};

//Add new role in the db
function createNewRole(title,salary,depId) {
    const sql =`INSERT INTO role (title, salary, department_id) VALUES ("${title}",${salary},${depId});`;  
    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        console.log('\nNew Role added\n'); 
        startFunction();
      });
};


//Main function presented the list of options
function promptUser(){
inquirer
    .prompt([
        {type: 'list',
         message: 'What would you like to do?',
         choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
         name: 'action',
    }
    ])
    .then ((data) => {
        const decision = data.action;
        switch (decision){
            case 'View All Departments':
                viewDepartments()
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                getDepartmentsForRole();
                break; 
            case 'Add an Employee':
                    //goto funtion
                break;        
            case 'Update an Employee Role':
                        //goto funtion
                break;
            case 'Quit':
                quit();
                break;            
            default:
                console.log("That's not supported");
                break;                                            
        };
    })
};

function startFunction() {
    promptUser();
}

//Call the main starter function
//promptUser();
startFunction();


//quit function
function quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  };





