// Functions for queries
// Require connection
const connection = require("./connection");

class Helper {
  //Passing through connection as a constructor for use throughout helper class
  constructor(connection) {
    this.connection = connection;
  }
  //View all departments
  //SELECT department ids, name from department table
  viewAllDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }
  //View all roles
  //SELECT rolle id, title, salary, department id from role
  viewAllRoles() {
    return this.connection
      .promise()
      .query("SELECT role.id, role.title, role.salary FROM role");
  }
  //View all employees
  //SELECT employee id, first name, last name, role id?
  viewAllEmployees() {
    return this.connection
      .promise()
      .query("SELECT employee.id, employee.first_name, employee.last_name;");
  }
  //Create department
  //INSERT INTO department table and SET query department
  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
  //Create role
  //INSERT INTO role table and SET query role
  createRole(role) {
    return this.connection
      .promise()
      .query("INSERT INTO role SET ?", role);
  }
  //Create employee
  //INSERT INTO employee table and SET query employee
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }
  //Update role
  //UPDATE employee role id and match to role table id's
  updateRole(employeeid, roleid) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [employeeid, roleid]);
  }
  //Get employees by department
  //SELECT employee data, role title from employee table, JOIN role id with employee role id, JOIN department id with role id
  getEmployeesByDepartment(departmentid){
    return this.connection
    .promise()
    .query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id WHERE department.id = ?", departmentid);
  }
}

module.exports = new Helper(connection);