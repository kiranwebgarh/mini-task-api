const express = require("express");
const Joi = require("joi");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;

app.get("/", (req, res) => {
  res.send("Welcome world Check!!");
});

app.get("/health", (req, res) => {
  res.json({ status: "working" });
});
app.get("/tasks", (req, res) => {
  res.json(tasks);
});
const taskSchema = Joi.object({
  title: Joi.string().min(3).required()
});

app.post("/tasks", (req, res) => {
  const { error } = taskSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newTask = {
    id: idCounter++,
    title: req.body.title,
    done: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.patch("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "This task is not found please check again!!!" });
  }

  task.done = req.body.done;

  res.json(task);
});


app.listen(PORT, () => {
  console.log("server started successfully!");
  console.log(`Running at http://localhost:${PORT}`);
});
