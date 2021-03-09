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

  //bonus part
  //delete the employee from database
  async function removeEmployee() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ]);
  
    //wait untill the database remove the employee id 
    await db.removeEmployee(employeeId);
  
    console.log("Employee is removed from the database.");
  
    loadingPrompts();
  }
  

  //Updating the employee role
  async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which role do you want to update for employee?",
        choices: employeeChoices
      }
    ]);
  
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message: "What role this new employee  will be assign to?",
        choices: roleChoices
      }
    ]);
  
    await db.updateEmployeeRole(employeeId, roleId);
  
    console.log("Updated employee's role");
  
    loadingPrompts();
  }
  

  //updating the employee manager
  async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const managers = await db.findAllPossibleManagers(employeeId);
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Which employee do you want to set as manager for the selected employee?",
        choices: managerChoices
      }
    ]);
  
    await db.updateEmployeeManager(employeeId, managerId);
  
    console.log("Updated employee's manager");
  
    loadingPrompts();
  }
  
  
  //Viewing roles
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    loadingPrompts();
  }
  
  
  //Adding new role
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    loadingPrompts();
  }
  

  
  //Deleting the role
  async function removeRole() {
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role do you want to remove? (Warning: This will also remove employees)",
        choices: roleChoices
      }
    ]);
  
    await db.removeRole(roleId);
  
    console.log("Removed role from the database");
  
    loadingPrompts();
  }
  
  
  //Viewing the departments
  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    loadingPrompts();
  }
  
//Adding new department
async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await db.createDepartment(department);

  console.log(`Added ${department.name} to the database`);

  loadingPrompts();
}


//Delete the department
async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Which department would you like to delete? (Warning: This will also delete associated roles and employees)",
    choices: departmentChoices
  });

  await db.removeDepartment(departmentId);

  console.log(`Department is deleted from the database.`);

  loadingPrompts();
}


//Adding new department and employee
async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });
