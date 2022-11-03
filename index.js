const inquirer = require("inquirer");
const fs = require("fs");
const helper = require("./db/helper");

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
      {
        name: "Stop bulding database",
        value: "STOP",
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
        getEmployeesByDepartment();
        break;
      case "DELETE_DEPARTMENT":
        removeDepartment();
        break;
      case "DELETE_ROLES":
        removeRole();
        break;
      case "DELETE_EMPLOYEE":
        fireEmployee();
        break;
      case "STOP":
        stop();
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
  helper.viewAllDepartments().then(([rows]) => {
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
          name: "department_id",
          message: "Which department fits this role?",
          choices: departmentSelect,
        },
      ])
      .then((data) => {
        let role = data
        console.log(role)
        helper
          .createRole(role)
          .then(() => console.log(`Role added.`))
          .then(() => init());
      });
  });
}

//Function to add employee
//Prompt questions for name, then getting role options, then department options, then manager options and adding them to the db
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
            helper.viewAllEmployees()
            .then(([rows]) => {
              let employees = rows;
              const managerChoice = employees.map(({id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));
              inquirer.prompt([
                {
                  type: "list",
                  name: "managerId",
                  message: "Who is their manager?",
                  choices: managerChoice,
                }]).then((data) => {
                  let employee = {
                    role_id: roleId,
                    first_name: Fname,
                    last_name: Lname,
                  }
                  helper
                  .createEmployee(employee)
                  .then(() => console.log(`Employee added.`))
                  .then(() => init());
                })
            })
          });
      });
    });
}

//Update Employee Role
//Getting employees, then inquiring on which employee to change, then roles and reassigning employee to said role
function updateEmployeeRole() {
  helper.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoice = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Who's role would you like to update?",
          choices: employeeChoice,
        },
      ])
      .then((data) => {
        let employeeId = data.employeeId;
        helper.viewAllRoles().then(([rows]) => {
          let roles = rows;
          const roleChoice = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "roleId",
                message: "Which role would you like to assign this person?",
                choices: roleChoice,
              },
            ])
            .then((data) => {
              helper.updateRole(employeeId, data.roleId)
              .then(() => console.log("Role updated"))
              .then(() => init())
            })
        });
      });
  });
}

//Get employees by department
//First get department, based on department selection get employees with matching department id's
function getEmployeesByDepartment() {
  helper.viewAllDepartments()
  .then(([rows]) => {
    let deparatments = rows;
    const deparatmentChoice = deparatments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like see employees from?",
          choices: deparatmentChoice,
        },
      ])
      .then((data) => {
        helper.getEmployeesDepartment(data.departmentId)
        .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees)
      })
      .then(() => init())
    })
  })
}

//Remove employee from db
//Getting employee table and iterating over the table rows, then prompting which employee to delete
function fireEmployee() {
  helper.viewAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoice = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Who would you like to fire/delete?",
          choices: employeeChoice,
        }
      ])
      .then((data) => {
        helper.deleteEmployee(data.employeeId)
        .then(() => console.log("Employee fired."))
        .then(() => init())
      })
  })
}
//Remove department
//First getting department table and iterating over the table rows,then prompting which department to delete
function removeDepartment() {
  helper.viewAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoice = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Which department would you like to delete?",
          choices: departmentChoice,
        },
      ])
      .then((data) => {
        helper.deleteDepartment(data.departmentId)
        .then(() => console.log("Department deleted."))
        .then(() => init());
      })
  });
}

// Remove role
//First getting roles and iterating over the rows,then prompting which role to delete
function removeRole() {
  helper.viewAllRoles().then(([rows]) => {
    let roles = rows;
    const roleChoice = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "roleId",
          message: "Which role would you like to delete?",
          choices: roleChoice,
        },
      ])
      .then((data) => {
        console.log(data)
        helper.deleteRole(data.roleId)
        .then(() => console.log("Role deleted."))
        .then(() => init());
      })
  });
}

//Function to stop the inquirer prompts
function stop() {
  console.log("Workforce Database now shutting down!");
  process.abort();
}

init();
