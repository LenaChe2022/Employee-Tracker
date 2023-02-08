--WHEN I choose to view all departments--
--THEN I am presented with a formatted table showing--
--department names and department ids--
SELECT * FROM department;

--WHEN I choose to view all roles--
--THEN I am presented with the job title,--
-- role id, the department that role belongs to, --
--and the salary for that role--
SELECT role.title AS job_title, role.id AS role_id, 
department.name AS department, salary 
FROM role
JOIN department ON role.department_id = department.id;