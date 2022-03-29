const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // find employees method
  findAllEmployees() {
    return this.connection.query(
      `SELECT employee.id,first_name,last_name,department_name,salary
      FROM employee
      LEFT JOIN roles ON employee.roles_id = roles.id 
      LEFT JOIN department ON roles.department_id = department.id`
    );
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  // Update the given employee's role
  // TODO:
  updateEmployeeRole(employeeId, rolesId) {
    return this.connection.query(
      "UPDATE employee SET roles_id = ? WHERE id = ?",
    [rolesId, employeeId]);
  }

  // Update the given employee's manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection.query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.query(
      "Select roles.id, roles.title, roles.salary, department.name \
      FROM role LEFT JOIN department On roles.department_id = department.id"
    );
  }

  // Create a new role
  createRole(roles) {
    return this.connection.query(
      "INSERT INTO roles SET ?", roles
    );
  }

  // Find all departments, join with employees and roles and sum up utilized department budget
  findAllDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name, SUM(roles.salary) AS utilized_budget \
      FROM department LEFT JOIN role ON roles.department_id = department.id \
      LEFT JOIN employee ON employee.roles_id = roles.id \
      GROUP BY department.id, department.name"
    );
  }

  // Create a new department
  createDepartment(department) {
    return this.connection.query(
      "INSERT INTO department SET ?", department
    );
  }

  // Find all employees in a given department, join with roles to display role titles
  findAllEmployeesByDepartment(departmentId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title \
      FROM employee \
      LEFT JOIN role on employee.role_id = role.id \
      LEFT JOIN department department on role.department_id = department.id \
      WHERE department.id = ?;",
      departmentId
    );
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
  findAllEmployeesByManager(managerId) {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name FROM employee \
      LEFT JOIN roles ON employee.role_id = role.id \
      LEFT JOIN department ON roles.department_id = department.id \
      WHERE manager.id = ?",
      managerId
    );
  }
}

module.exports = new DB(connection);
