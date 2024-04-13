const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then(() => console.log("Connected to the db!"))
  .catch(console.error);

const Todo = require("./models/todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  todo.save();
  res.json(todo);
  console.log(todo + " new todo added!");
});

app.delete("/todo/delete/:id", async (req, res) => {
  // app.delete("/todo/delete/:id" and the odo.findByIdAndDelete(req.params.id); both id should be same (name name name)
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
  console.log(result + " deleted!");
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;
  todo.save();
  res.json(todo);
  console.log(todo + " completed!");
});

app.listen(3001, () => console.log("Server started on port 3001"));
