const inquirer = require("inquirer");
const fs = require("fs");
const helper = require("./db/helper");
const { viewAllDepartments, viewAllRoles } = require("./db/helper");

//Create functions based off helper queries to change db
//Choice options for database use
const startingPrompts = [
  {
    type: "list",
    name: "choice",
    message: "Choose your function for this database!",
    choices: [
      {
        name: "View all departments",
        value: "VIEW_DEPARTMENTS",
      },
      {
        name: "View all roles",
        value: "VIEW_ALL_ROLES",
      },
      {
        name: "View all employees",
        value: "VIEW_ALL_EMPLOYEES",
      },
      {
        name: "Add department",
        value: "ADD_DEPARATMENT",
      },
      {
        name: "Add role",
        value: "ADD_ROLE",
      },
      {
        name: "Add employee",
        value: "ADD_EMPLOYEE",
      },
      {
        name: "Update employee role",
        value: "UPDATE_EMPLOYEE_ROLE",
      },
      {
        name: "View employees by department",
        value: "VIEW_EMPLOYEES_DEPARTMENT",
      },
      {
        name: "Delete department",
        value: "DELETE_DEPARTMENT",
      },
      {
        name: "Delete role(s)",
        value: "DELETE_ROLES",
      },
      {
        name: "Delete employee >:)",
        value: "DELETE_EMPLOYEE",
      },
    ],
  },
];
//Init to start inquirer process
function init() {
  inquirer.prompt(startingPrompts).then((data) => {
    console.log(data);
    let choice = data.choice;
    //Switch based upon choice from inquirer
    switch (choice) {
      case "VIEW_DEPARTMENTS":
        getAllDepartments();
        break;
      case "VIEW_ALL_ROLES":
        getRoles();
        break;
      case "VIEW_ALL_EMPLOYEES":
        getAllEmployees();
        break;
      case "ADD_DEPARATMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "VIEW_EMPLOYEES_DEPARTMENT":
        getEmployeeDepartment();
        break;
      case "DELETE_DEPARTMENT":
        deleteDepartment();
        break;
      case "DELETE_ROLES":
        deleteRole();
        break;
      case "DELETE_EMPLOYEE":
        deleteEmploy();
        break;
      default:
        stop();
    }
  });
}

//Function to get all departments
function getAllDepartments() {
  helper
    .viewAllDepartments()
    .then(([rows]) => {
      let department = rows;
      console.table(department);
    })
    .then(() => init());
}

//Function to get all roles
function getRoles() {
  helper
    .viewAllRoles()
    .then(([rows]) => {
      let role = rows;
      console.table(role);
    })
    .then(() => init());
}

//Function to get all employees
function getAllEmployees() {
  helper
    .viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => init());
}

//Function to add a department
function addDepartment() {
  //Prompts for department to be added
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the deparatment you'd like to add",
      },
    ])
    .then((data) => {
      let name = data;
      helper
        .createDepartment(name)
        .then(() => console.log(`Department added.`))
        .then(() => init());
    });
}

//Function to add a role
function addRole() {
  //getting/viewing all employees, then mapping departments based on id and name
  helper.viewAllEmployees().then(([rows]) => {
    let departments = rows;
    const departmentSelect = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    //Prompt for new role information
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of this role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role?",
        },
        {
          type: "list",
          name: "deparatment_id",
          message: "Which department fits this role?",
          choices: departmentSelect,
        },
      ])
      .then((role) => {
        helper
          .createRole(role)
          .then(() => console.log(`Role added.`))
          .then(() => init());
      });
  });
}

//Function to add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is this employees first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is this employees last name?",
      },
    ])
    .then((data) => {
      let Fname = data.first_name;
      let Lname = data.last_name;

      helper.viewAllRoles().then(([rows]) => {
        let roles = rows;
        const roleSelect = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleId",
              message: "What is their role?",
              choices: roleSelect,
            },
          ])
          .then((data) => {
            let roleId = data.roleId;
            let employee = {
              role_id: roleId,
              first_name: Fname,
              last_name: Lname,
            };

            helper.createEmployee(employee);
          });
      });
    });
}

function updateEmployeeRole() {
  helper
    .viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => init());
}

function getEmployeeDepartment() {
  helper
    .viewAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => init());
}

function stop() {
  console.log("Workforce Database now shutting down!");
  process.abort();
}
