const getConnection = require("./db");

const addEmployee = async (
  name,
  department,
  age,
  presentAddress,
  permanentAddress
) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO EMPLOYEE (name, department, age, presentAddress, permanentAddress) values (?,?,?,?,?)",
    [name, department, age, presentAddress, permanentAddress]
  );
};

const addTask = async (title, status, description) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO task (title, status, description) values (?,?,?)",
    [title, status, description]
  );
};

const addTaskEmployee = async (task_id, employee_id) => {
  const connection = await getConnection();
  return connection.execute(
    "INSERT INTO employee_task (task_id, employee_id) values (?,?)",
    [task_id, employee_id]
  );
};

const getAllEmployees = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select id, name,TIMESTAMPDIFF(YEAR, age, CURDATE()) AS age, presentAddress, permanentAddress from employee where isDeleted = 0 order by id"
  );
};

const getEmployee = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select id, name,TIMESTAMPDIFF(YEAR, age, CURDATE()) AS age, presentAddress, permanentAddress from employee where isDeleted = 0 and id=?",
    [id]
  );
};

const getTask = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select task_ID as id, title, status, description, dateStarted, dateCompleted from task where isDeleted = 0 and task_ID=?",
    [id]
  );
};

const getEmployeeDepartment = async (department) => {
  const connection = await getConnection();
  return connection.execute(
    "select id, name,TIMESTAMPDIFF(YEAR, age, CURDATE()) AS age, presentAddress, permanentAddress from employee where isDeleted = 0 and department=?",
    [department]
  );
};

const getEmployeeTasks = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "select employee_task.employee_id,employee.name, task.title, task.status, task.description, task.dateStarted, task.dateCompleted from ((employee_task inner join task on employee_task.task_ID = task.task_ID) inner join employee on employee_task.employee_id = employee.id) where task.isDeleted = 0 and employee.id=?",
    [id]
  );
};


const updateAddress = async (id, presentAddress, permanentAddress) => {
  const connection = await getConnection();
  return connection.execute(
    "update employee set presentAddress=?, permanentAddress=? where id=?",
    [presentAddress, permanentAddress, id]
  );
};

const updateTask = async (id, title, status, description) => {
  const connection = await getConnection();
  return connection.execute(
    "update task set title=?, status=?, description=? where task_ID=?",
    [title, status, description, id]
  );
};

const deleteEmployee = async (id) => {
  const connection = await getConnection();
  return connection.execute(
    "update employee set isDeleted=1 where id=?",
    [id]
  );
};

const deleteTask = async (id) => {
  const connection = await getConnection();
  return connection.execute("update task set isDeleted=1 where task_ID=?", [id]);
};

const getAllDepartments = async () => {
  const connection = await getConnection();
  return connection.execute(
    "select department from employee group by department"
  );
};

const getAllTasks = async () => {
  const connection = await getConnection();
  return connection.execute("select * from task where isDeleted = 0");
};

module.exports = {
  addEmployee,
  addTask,
  addTaskEmployee,
  getAllEmployees,
  getEmployee,
  getEmployeeDepartment,
  updateAddress,
  updateTask,
  deleteEmployee,
  deleteTask,
  getAllDepartments,
  getEmployeeTasks,
  getTask,
  getAllTasks,
};
