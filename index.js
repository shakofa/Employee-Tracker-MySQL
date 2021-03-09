const {prompt} = requires ("inquire");
const db = require ("./db");
const consoleTable = require ("console.table");

init();


//Loading the prompt
async function loadingPrompts () {
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
};

 //Viewing the employees
async function viewEmployees() {

  const employees = await db.viewEmployees();

  console.log("\n");
  console.table(employees);

  //Everytime the employee is called then load the promts
  loadingPrompts();
};


//Viewing employees by department
async function viewEmployeesByDepartment() {

  const departments = await db.findAllDepartments();
   
  //a construtor function
  const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));

  const{ departmentId} = await prompt([
      {
          type: "list",
          name: "departmentId",
          message: "What department are you looking for employees?",
          choices: departmentChoices
        }
      ]);
  //wait for database to find employee byy department
  const employees = await db.findAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadingPrompts();
};


//viewing manager employees
async function viewEmployeesByManager() {
  const managers = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which employee's direct reports do you want to see?",
      choices: managerChoices
    }
  ]);

  const employees = await db.findAllEmployeesByManager(managerId);

  console.log("\n");
  
  //check if the employee has anymatch
  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    console.table(employees);
  }

  loadingPrompts();
}

