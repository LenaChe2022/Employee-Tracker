INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO role(title, salary, department_id)
VALUES ("specialist", 150, 2),
       ("intern", 100, 1),
       ("manager", 200, 2),
       ("specialist", 170, 1),
       ("manager", 200, 1),
       ("manager", 300, 3),
       ("manager", 200, 4),
       ("specialist", 150, 3),
       ("specialist", 160, 4),
       ("developer", 180, 1),
       ("tester", 120, 1),
       ("distinguished engimeer", 400, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vasya", "Pupkin", 12, null),
       ("Bob","black", 3, null),
       ("Mark", "Ronson", 2, 2),
       ("Don", "Juan", 7, 2),
       ("Mike", "Vasovsly", 9, null),
       ("Rebekka","White", 7, 5),
       ("Jery", "Hollywell", 10, 5);
