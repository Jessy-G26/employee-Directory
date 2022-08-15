const express = require("express");
const {
  addEmployee,
  addTask,
  addTaskEmployee,
  getAllEmployees,
  getEmployee,
  updateAddress,
  updateTask,
  deleteEmployee,
  deleteTask,
  getAllDepartments,
  getAllTasks,
  getTask,
  getEmployeeTasks,
  getEmployeeDepartment,
} = require("./utils/queryHelpers");
const app = express();

const genericError = "Sorry, something went wrong!";

app.use(express.json());

app.get("/departments", async function (request, response) {
  try {
    const [result] = await getAllDepartments();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/tasks", async function (request, response) {
  try {
    const [result] = await getAllTasks();
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/task/employee/:id", async function (request, response) {
  const { id } = request.params;
  console.log(id);
  try {
    const [result] = await getEmployeeTasks(id);
    console.log("result", id);
    if (result.length > 0) {
      response.send({ success: true, result });
    } else {
      response.status(404).send({
        success: false,
        error: `No task found with employee id ${id}`,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/", async function (request, response) {
  try {
    const [result] = await getAllEmployees();
    console.log([result]);
    response.send({ success: true, result });
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/:id", async function (request, response) {
  const { id } = request.params;
  try {
    const [result] = await getEmployee(id);
    if (result.length > 0) {
      response.send({ success: true, result: result[0] });
    } else {
      response.status(404).send({
        success: false,
        error: `No employee found with id ${id}`,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/task/:id", async function (request, response) {
  const { id } = request.params;
  console.log("id",id);
  try {
    const [result] = await getTask(id);
    console.log("result", result);
    if (result.length > 0) {
      response.send({ success: true, result: result[0] });
    } else {
      response.status(404).send({
        success: false,
        error: `No task found with id ${id}`,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.get("/department/:department", async function (request, response) {
  const { department } = request.params;
  console.log(department);
  try {
    const [result] = await getEmployeeDepartment(department);
    console.log("result",department); 
    if (result.length > 0) {
      response.send({ success: true, result: result[0] });
    } else {
      response.status(404).send({
        success: false,
        error: `No department found with ${department}`,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.post("/task/add/", async function (request, response) {
  try {
    const { title, status, description } =
      request.body;
    const [result] = await addTask(title, status, description);
    console.log(request.body);
    console.log("result", result);
    if (result.insertId) {
      const [data] = await getTask(result.insertId);
      console.log("data", data);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.post("/task/add/employee/", async function (request, response) {
  try {
    const { task_id, employee_id } = request.body;
    const [result] = await addTaskEmployee(task_id, employee_id);
    console.log(request.body);
    console.log("result", result);
    if (result.insertId) {
      response.send({ success: true });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.post("/", async function (request, response) {
  try {
    const { name, department, age, presentAddress, permanentAddress } =
      request.body;
    const [result] = await addEmployee(
      name,
      department,
      age,
      presentAddress,
      permanentAddress
    );
    console.log(request.body);
    console.log("result", result);
    if (result.insertId) {
      const [data] = await getEmployee(result.insertId);
      console.log("data", data);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(500).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/:id", async function (request, response) {
  console.log(request.body);
  try {
    const { presentAddress, permanentAddress } = request.body;
    const { id } = request.params;
    const [result] = await updateAddress(id, presentAddress, permanentAddress);
    if (result.affectedRows > 0) {
      const [data] = await getEmployee(id);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.put("/task/:id", async function (request, response) {
  console.log(request.body);
  try {
    const { title, status, description } = request.body;
    const { id } = request.params;
    const [result] = await updateTask(id, title, status, description);
    if (result.affectedRows > 0) {
      const [data] = await getTask(id);
      response.send({ success: true, result: data[0] });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.delete("/:id", async function (request, response) {
  try {
    const { id } = request.params;
    const [result] = await deleteEmployee(id);
    if (result.affectedRows > 0) {
      response.send({ success: true });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.delete("/task/:id", async function (request, response) {
  try {
    const { id } = request.params;
    const [result] = await deleteTask(id);
    if (result.affectedRows > 0) {
      response.send({ success: true });
    } else {
      response.status(400).send({
        success: false,
        error: genericError,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      error: genericError,
    });
  }
});

app.listen(8001);
