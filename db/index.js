const connection = require("./connection");

class db {
  constructor(connection) {
    this.connection = connection;
  }

  //tested
  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  //tested
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, role.salary, department.dept_name AS department FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  }

  //tested
  findAllEmployees() {
    return this.connection.promise()
    .query(`SELECT
    employee.id, CONCAT(employee.first_name, ' ' , employee.last_name) AS name, role.title, department.dept_name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager
    FROM
    employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`);
}

//tested
addADepartment(departmentName) {
    return this.connection
      .promise()
      .query("INSERT INTO department (dept_name) VALUES (?)", [departmentName]);
  }

  //tested
  addARole(roleTitle, roleSalary, roleDepartmentId) {
    return this.connection
      .promise()
      .query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [roleTitle, roleSalary, roleDepartmentId]
      );
  }

  //tested
  addAnEmployee(answer) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", answer);
  }

  //tested
  updateAnEmployeeRole(roleId, employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  //tested
  updateAnEmployeeManager(managerId, employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET employee.manager_id = ? WHERE id = ?", [managerId, employeeId]);
  }  

  //tested
  findAllManagers(employeeId) {
      return this.connection.promise().query("SELECT * FROM employee WHERE id != ?", [employeeId]);
  }

  //tested
  findByManager(managerId) {
    return this.connection.promise().query(`SELECT employee.id, employee.manager_id, CONCAT(employee.first_name, ' ' , employee.last_name) AS name FROM employee LEFT JOIN roles on employee.role_id = role.id WHERE manager_id = ?`, [managerId]);
  }

  //tested
  findByDepartment(departmentId) {
      console.log("depId: ", departmentId)
    return this.connection.promise().query(`SELECT CONCAT(employee.first_name, ' ' , employee.last_name) AS name, department.name AS department
    FROM employee LEFT JOIN roles on employee.role_id = role.id LEFT JOIN department on roles.department_id = department.id
    WHERE department.id = ?`, [departmentId]);
  }

  //tested
  deleteADepartment(departmentId) {
    return this.connection.promise().query("DELETE FROM department WHERE id = ?", [departmentId]);
  }

  //tested
  deleteARole(roleId) {
    console.log("roleId: ", roleId)
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", [roleId]); 
  }

  //tested
  deleteAnEmployee(employeeId) {
    return this.connection.promise().query("DELETE FROM employee WHERE id = ?", [employeeId]);
  }

  //tested
  findDepartmentBudget() {
    return this.connection.promise().query("SELECT department.dept_name AS department, department.id, SUM(salary) AS total_salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id");
  }
}

module.exports = new db(connection);