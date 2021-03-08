/*Adding the data to the tables*/


--Department table
INSERT INTO department (name)
Values 
("Sales");
("Engineering");
("Finance");
("Legal");


-- Role table
INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Manager", 90000, 1),
("Sales Associates", 50000, 1),
("Software Engineers Leader", 120000, 2),
("Mechanical Engineer", 100000, 2),
("Finance Team Manager", 150000, 3),
("Accountant", 95000, 3),
("Legal department Manager", 130000, 4),
("Lawyer", 170000, 4);



--Employ table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Alex", "Crouse", 1, NULL),
("Avani", "patel", 2, 1),
("Tom", "Sayer", 3, NULL),
("Jasmine", "Lourd", 4, 3),
("Abe", "Seri", 5, NULL),
("Max", "Villiam", 6, 5),
("Jhon", "Wek", 7, NULL),
("Brett", "Jhonson", 8, 7);
