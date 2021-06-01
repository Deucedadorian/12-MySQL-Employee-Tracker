const util = require('util');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { promisify } = require('util');
const { connection } = require('./connection');
const { type } = require('os');

const queryAsync = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
  if (err) throw err;
  selectTask();
});

let selectTask = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        // 'View All Employees By Department',
        // 'View All Employees By Manager',
        // 'View All Roles',
        // 'View All Departments',
        'View Total Utilized Budget of Department',
        // 'Add New Employee',
        // 'Add New Role',
        // 'Add New Department',
        // 'Update Employee',
        'Remove Employee',
        'Remove Role',
        'Remove Department',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          viewEmployees();
          break;

        case 'View All Employees By Department':
          employeeByDepartment();
          break;

        case 'View All Employees By Manager':
          employeesByManager();
          break;

        case 'Add New Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Update Employee':
          updateEmpolyee();
          break;

        case 'View All Roles':
          viewRoles();
          break;

        case 'Add New Role':
          addRole();
          break;

        case 'Remove Role':
          removeRole();
          break;

        case 'View All Departments':
          viewDepartments();
          break;

        case 'Add New Department':
          addDepartment();
          break;

        case 'Remove Department':
          removeDepartment();
          break;

        case 'View Total Utilized Budget of Department':
          departmentBudget();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// View Departments, Roles and Employees
let viewEmployees = () => {
  const query = `
  SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    title, 
    d.name AS department,
    salary,
    m.first_name AS manager
FROM employees e
LEFT JOIN roles r 
    ON e.role_id = r.id
LEFT JOIN employees m
    ON e.manager_id = m.id
LEFT JOIN departments d
    ON r.id = d.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    selectTask();
  });
};

let viewDepartments = () => {
  connection.query(`SELECT name AS Departments FROM departments;`,
  (err, res) => {
    if (err) throw err;
    console.table(res);
    selectTask();
  });
}

let viewRoles = () => {
  connection.query('SELECT title AS Roles FROM roles;',
  (err, res) => {
    if (err) throw err;
    console.table(res);
    selectTask();
  });
} 

// add Departments, Roles and Employees
let addEmployee = () => {
  Promise.all([getRoles(), getManagers()])
  .then(([ roles, managers ]) =>
    inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the employee\'s first name:',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the employee\'s last name:',
      },
      {
        name: 'role',
        type: 'list',
        message: 'Enter the employee\'s role:',
        choices: roles,
      },
      {
        type: 'list',
        name: 'managerCheck',
        message: 'Does the employee have a manager?',
        choices: ['yes', 'no'],
      },
      {
        name: 'manager',
        type: 'list',
        choices: managers,
        when: (answers) => answers.managerCheck === 'yes',
      },
    ])
  )
  .then((answers) => {
    if (answers.managerCheck === 'yes') {
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: Number(answers.role),
          manager_id: Number(answers.manager),
        },
        (err) => {
          if (err) throw err;
          selectTask();
        }
      );
    } else {
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: Number(answers.role),
        },
        (err) => {
          if (err) throw err;
          selectTask();
        }
      );
    }
  })
};

let getRoles = async () => {
  try {
    const rows = await queryAsync('SELECT * FROM roles');
    return rows.map((role) => ({name: role.title, value: role.id}));
  } catch (err) {
      console.log(`Err at getRoles,`, err);
  }
};

let getManagers = async () => {
  try {
    const rows = await queryAsync('SELECT first_name, last_name, id FROM employees WHERE manager_id IS NULL');
    return rows.map((manager) => ({name: `${manager.first_name} ${manager.last_name}`, value: manager.id}));
  } catch (err) {
      console.log(`Err at getRoles,`, err);
  }
};

let addDepartment = () => {
  inquirer
  .prompt({
    name: 'department',
    type: 'input',
    message: 'Enter the name of the new department:'
  })
  .then((answers) => {
    connection.query('INSERT INTO departments SET ?',
      {
        name: answers.department
      },
      (err) => {
        if (err) throw err;
        selectTask();
      }
    );
  });
}

let addRole = async () => {
  const departments = await getDepartments();
  const answers = await inquirer.prompt([
    {
    name: 'title',
    type: 'input',
    message: 'Enter the name of the new role:'
    },
    {
      name: 'salary',
      type: 'number',
      message: 'Enter the salary of the new role:'
    },
    {
      name: 'departmentId',
      type: 'list',
      message: 'Enter the department id of the new role:',
      choices: departments,
    }
  ])
  await connection.query('INSERT INTO roles SET ?',
    {
      title: answers.title,
      salary: answers.salary,
      department_id: Number(answers.departmentId)
    },
    (err) => {
      if (err) throw err;
      selectTask();
    }
  );
}

let getDepartments = async () => {
  try {
    const rows = await queryAsync('SELECT * FROM departments');
    return rows.map((department) => ({name: department.name, value: department.id}));
  } catch (err) {
      console.log(`Err at getDepartments,`, err);
  }
}

// update Employee roles
let updateEmpolyee = () => {
  Promise.all([getEmployees(), getRoles(), getManagers()])
  .then(([ employees, roles, managers ]) =>
    inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: 'Choose the employee to update:',
        choices: employees,
      },
      {
        name: 'role',
        type: 'list',
        messages: 'Choose the employee\'s role:',
        choices: roles,
      },
      {
        name: 'managerCheck',
        type: 'list',
        message: 'Does the employee now have a manager?',
        choices: ['yes', 'no'],
      },
      {
        name: 'manager',
        type: 'list',
        choices: managers,
        message: 'Who is the employee\'s manager?',
        when: (answers) => answers.managerCheck === 'yes',
      },
    ])
  )
  .then((answers) => {
    if (answers.managerCheck === 'yes') {
      connection.query(
        'UPDATE employees SET ? WHERE ?',
        [
          {
            role_id: answers.role,
            manager_id: Number(answers.manager), 
          },
          {
            id: Number(answers.employee)
          }
        ],
        (err) => {
          if (err) throw err;
          selectTask();
        }
      );
    } else {
      connection.query('UPDATE employees SET ? WHERE ?',
        [
          {
            role_id: answers.role,
            manager_id: null, 
          },
          {
            id: Number(answers.employee)
          }
        ],
        (err) => {
          if (err) throw err;
          selectTask();
        }
      );
    }
  });
}

let getEmployees = async () => {
  try {
    const rows = await queryAsync('SELECT * FROM employees');
    return rows.map((employee) => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id}));
  } catch (err) {
    console.log('Err at getEmployees');
  }
}