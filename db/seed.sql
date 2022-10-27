INSERT INTO department (id, name)
VALUES (001, "Sales"),
        (002, "Human Resources"),
        (003, "Management"),
        (004, "Warehouse"),
        (005, "Accounting");

INSERT INTO role (id, title, salary, department_id)
VALUES (100, "Regional Manager", 100000, 003),
(101, "HR Representative", 80000, 002),
(102, "Truck Driver", 60000, 004),
(103, "Financial Analyst", 80000, 005),
(104, "Senior Sales Advisor",  90000, 001),
(105, "Junior Sales Advisor", 75000, 001):

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (21, "Michael", "Scott", 100),
(66, "Toby", "Flenderson", 002, 21),
(45, "Tuna", "Halpert", 001, 21),
(69, "Dwight", "Schrute". 001, 21);
