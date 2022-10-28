const inquirer = require('inquirer');
const fs = require('fs');
const helper = require()
const { prompt }

//Create functions based off helper queries to change db

const startingPrompts = [
    {
        type: "list",
        name: "choice",
        message: "Choose your function for this database!",
        choices: [
            {
                name: "View all departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name: "View all roles",
                value: "VIEW_ALL_ROLES"
            },
            {
                name: "View all employees",
                value: "VIEW_ALL_EMPLOYEES"
            },
            {
                name: "Add department",
                value: "ADD_DEPARATMENT"
            },
            {
                name: "Add role",
                value: "ADD_ROLE"
            },
            {
                name: "Add employee",
                value: "ADD_EMPLOYEE"
            },
            {
                name: "Update employee role",
                value: "UPDATE_EMPLOYEE_ROLE"
            },
            {
                name: "Update employee managers",
                value: "UPDATE_EMPLOYEE_MANAGERS"
            },
            {
                name: "View employee managers",
                value: "VIEW_EMPLOYEE_MANAGERS"
            },
            {
                name: "View employees by department",
                value: "VIEW_EMPLOYEES_DEPARTMENT"
            },
            {
                name: "Delete department",
                value: "DELETE_DEPARTMENT"
            },
            {
                name: "Delete role(s)",
                value: "DELETE_ROLES"
            },
            {
                name: "Delete employee >:)",
                value: "DELETE_EMPLOYEE"
            },
        ]
    }
]

function init(){
    inquirer.prompt(startingPrompts).then((data) => {
        switch(data){
            case(data)
        }
    })
}

function deleteEmployee(){

}