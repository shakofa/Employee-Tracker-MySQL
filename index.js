const {prompt} = requires ("inquire");
const db = require ("./db");
const consoleTable = require ("console.table");

init();

async function loadingPrompt () {
    const { choice } = await prompt([

        {
           type: "list",
           name: "choice",
           message: "what would you like to do?",
           choices: [

            {
                name: "View All Employees",
                value: "VIEW_EMPLOYEES"
            },
            {
                name: "View All Employees By Department",
                value: "VIEW-EMPLOYEES-BY-DEPARTMENTS"
            },
            {
                name: "View All Employees By Manager",
                value: "VIEW-EMPLOYEES-BY-MANAGER"
            },
            {
                name: "Add Employee",
                type: "ADD-EMPLOYEE"
            },
            {
                name: "Remove Employee",
                type: "REMOVE-EMPLOYEE"
            },
            {
                name: "Update Employee Role",
                type: "UPDATE-EMPLOYEE"
            },
            {
                name: "Update Employee Manager",
                type: "UPDATE-MANAGER"
            },
            {
                name: "View All Roles",
                value: "VIEW_ROLES"
              },
              {
                name: "Add Role",
                value: "ADD_ROLE"
              },
              {
                name: "Remove Role",
                value: "REMOVE_ROLE"
              },
              {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS"
              },
              {
                name: "Add Department",
                value: "ADD_DEPARTMENT"
              },
              {
                name: "Remove Department",
                value: "REMOVE_DEPARTMENT"
              },
              {
                name: "Quit",
                value: "QUIT"
              }
           ]
        }
    ]);


    // Call the functions based on what user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "VIEW_ROLES":
            return viewRoles();
        case "ADD_ROLE":
            return addRole();
        case "REMOVE_ROLE":
            return removeRole();
        default:
            return quit();
    }
}

     
async function viewEmployees() {

    const employees = await db.viewEmployees();

    console.log("\n");
    console.table(employees);

     loadinPrompts();
}



}

