--WHEN I choose to view all departments--
--THEN I am presented with a formatted table showing--
--department names and department ids--
SELECT * FROM department;
SELECT name AS department_name, id AS department_id FROM department;

--show the role table--
SELECT * FROM role;

--show employee table--
SELECT * FROM employee;

--WHEN I choose to view all roles--
--THEN I am presented with the job title,--
-- role id, the department that role belongs to, --
--and the salary for that role--
SELECT role.title AS job_title, role.id AS role_id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id;

--WHEN I choose to view all employees--
--formatted table showing employee data--
--including employee ids, first names, last names, job titles, departments,--
-- salaries, and managers that the employees report to--
SELECT employee.id AS employee_id, first_name, last_name, role.title AS job_title, department.name AS department, role.salary AS salary, manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id; 

--WHEN I choose to add a department--
--THEN I am prompted to enter the name of the department --
--and that department is added to the database--
INSERT INTO department (name) VALUES ("Accounts");

SELECT * FROM department;

--WHEN I choose to add a role--
--THEN I am prompted to enter the name, salary, and department --
--for the role and that role is added to the database--
INSERT INTO role (title, salary, department_id);

--WHEN I choose to add an employee--
--THEN I am prompted to enter the employee’s first name, last name,--
-- role, and manager, and that employee is added to the database--
INSERT INTO employee (first_name, last_name, role_id, manager_id);

--WHEN I choose to update an employee role--
--THEN I am prompted to select an employee to update--
-- and their new role and this information is updated in the database--
UPDATE employee SET role_id = 5 WHERE id = 3;


--BONUS--

--Update employee managers--

--View employees by manager--

--View employees by department--

--Delete departments, roles, and employees.--

--View the total utilized budget of a department;-- 
--in other words, the combined salaries of all employees in that department--