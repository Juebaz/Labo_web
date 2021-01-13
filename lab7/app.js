const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpExeception = require("./utils/httpExeception");
const User = require("./repositories/user.js");
const Task = require("./repositories/task");
const app = express();

const port = 5000;

mongoose
  .connect(
    "mongodb://localhost:27017/lab10",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .catch((err) => {
    console.log(err);
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // permet de recevoir les cookies
  })
);

// POST /users creation d'un user
app.post("/users", async (req, res) => {
  const user = await User.create();
  return res.status(201).json(user);
});

// GET/users/:userid/tasks listes des tâches du user
app.get("/:userId/tasks", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findUserById(userId);
  if (!user) {
    throw new HttpExeception(404, "user not found");
  }
  const tasks = await Task.findTaskByUserId(userId);

  return res.status(200).json(tasks);
});

// POST /users/:userID/tasks création d'une tâche pour ce user
app.post("/:userId/tasks", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const user = await User.findUserById(userId);
  if (!user) {
    throw new HttpExeception(404, "user not found");
  }
  // creer la tâche
  const task = await Task.create(userId, name);
  return res.status(201).json(task);
});

// PUT /users/:userID/tasks/:taskID mise-à-jour task
app.put("/:userId/tasks/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const { name } = req.body;
  const user = await User.findUserById(userId);

  if (!user) {
    throw new HttpExeception(404, "user not found");
  }

  const task = await Task.findTaskById(userId, taskId);
  if (!task) {
    throw new HttpExeception(404, "task not found");
  }

  const newTasks = await Task.update(userId, taskId, name);

  return res.status(201).json(newTasks);
});

app.delete("/:userId/tasks/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const user = await User.findUserById(userId);

  if (!user) {
    throw new HttpExeception(404, "user not found");
  }

  const task = await Task.findTaskById(userId, taskId);

  if (!task) {
    throw new HttpExeception(404, "task not found");
  }

  await Task.deleteTask(userId, taskId);

  return res.status(204).json({});
});

app.use((error, req, res, next) => {
  if (error instanceof HttpExeception) {
    return res.status(error.code).send(error.message);
  }
  return res.status(500).send("error");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}...yeah !`);
});
