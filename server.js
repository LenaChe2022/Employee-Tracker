
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');
const { Console } = require('console');



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

// Calling the start function
startFunction();

// Main function presented the list of options
function startFunction(){
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
                    getRolesForNewEmployee();
                    break;        
                case 'Update an Employee Role':
                    getEmployeesForUpdate();
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
    

// Shows department's name and id
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

// Shows Roles in a special selection
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

// Show formated Employee table
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

// Add a new department
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

// Add a new Role in the db
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

// Get all Roles for new employee
function getRolesForNewEmployee(){
    const sql = `SELECT role.title AS role, role.id AS id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;`;
        db.query(sql, (err, rows) => {
            if (err) {
             console.error(err);
               return;
            }
            promptNewEmployee(rows);     
          });
};  

// Get info for a new Employee
function promptNewEmployee(array){
    const allRolesArray = array; 
    const newArray = allRolesArray.map(patron => {
       const pObj = {...patron};
       pObj.roleAndDep = `${pObj.role} from ${pObj.department}`;
       return pObj;
    });   
    let choicesArray = [];
    newArray.forEach(element => 
        choicesArray.push(element.roleAndDep));

    inquirer
    .prompt([
       {type: "input",
       message: "Enter the employee's first name",
       name: "firstName"
       },
       {type: "input",
       message: "Enter the emloyee's last mane",
       name: "lastName"
       },
       {type:"list",
       message: "Choose the role and department",
       choices: choicesArray,
       name: "role",
       },
       {type: "input",
       message: "Enter the manager id",
       name: "manager"
       }
    ]).then((data) => {
        for (let i = 0; i < newArray.length; i++) {
            if (data.role === newArray[i].roleAndDep) {
                const roleId = newArray[i].id;
                createNewEmployee(data.firstName, data.lastName, roleId, data.manager);
            };  
        };
    });
};

// Add new employee in the db
function createNewEmployee(firstName,lastName,id,manager) {
    const sql =`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}","${lastName}",${id},${manager});`;  
    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        console.log(`\nNew employee ${firstName} ${lastName} added\n`); 
        startFunction();
      });
};

// Get all employees for update
function getEmployeesForUpdate(){
    const sql = `SELECT employee.id AS id, first_name AS name, last_name AS lastName FROM employee;`;
        db.query(sql, (err, rows) => {
            if (err) {
             console.error(err);
               return;
            }
            promptUpdateEmployeeName(rows);     
          });
};

// Get info which Employee to update
function promptUpdateEmployeeName(array){
    const allArray = array; 
    const newArray = allArray.map(patron => {
       const pObj = {...patron};
       pObj.fullName = `${pObj.name} ${pObj.lastName}`;
       return pObj;
    });   
    let choicesArray = [];
    newArray.forEach(element => 
        choicesArray.push(element.fullName));

    inquirer
    .prompt([
       {type:"list",
       message: "Choose an Employee you want to update",
       choices: choicesArray,
       name: "name",
       }
    ]).then((data) => {
        for (let i = 0; i < newArray.length; i++) {
            if (data.name === newArray[i].fullName) {
                const personId = newArray[i].id;
                getAllRolesForUpdate(personId);
            };  
        };
    });
};

// Get all Roles to update an employee
function getAllRolesForUpdate(personId){
    const neededId = personId;
    const sql = `SELECT role.title AS role, role.id AS id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;`;
        db.query(sql, (err, rows) => {
            if (err) {
             console.error(err);
               return;
            }
            promptUpdateEmployeeRole(rows,neededId);  
          });
};  

// Give the choise of new role to update an Employee
function promptUpdateEmployeeRole(array,personId){
    const manId = personId;
    const allRolesArray = array; 
    const newArray = allRolesArray.map(patron => {
        const pObj = {...patron};
        pObj.roleAndDep = `${pObj.role} from ${pObj.department}`;
        return pObj;
     });   
     let choicesArray = [];
     newArray.forEach(element => 
         choicesArray.push(element.roleAndDep));

    inquirer
    .prompt([
       {type:"list",
       message: "Choose a new role",
       choices: choicesArray,
       name: "role",
       }
    ]).then((data) => {
        for (let i = 0; i < newArray.length; i++) {
            if (data.role === newArray[i].roleAndDep) {
                const roleId = newArray[i].id;
                updateEmployee(manId, roleId);
            };  
        };
    });
};

// Updade an employee role in the db
function updateEmployee(personId,roleId) {
    const sql =`UPDATE employee SET role_id = ${roleId} WHERE id = ${personId};`;  
    db.query(sql, (err, rows) => {
        if (err) {
         console.error(err);
           return;
        }
        console.log(`\nEmployee role Updated\n`); 
        startFunction();
      });
};

// Quit function
function quit() {
    console.log("\nGoodbye!");
    process.exit(0);
  };





