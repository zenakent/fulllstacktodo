const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//api todo
router.get("/api/todos", async function(req, res) {
  // Todo.find({}, function(err, foundTodos) {
  //   res.json(foundTodos);
  // });
  try {
    let todo = await Todo.find({});
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//create todo
router.post("/api/todos", async function(req, res) {
  try {
    let todo = await Todo.create(req.body);
    console.log(todo);
    res.json(todo);
  } catch (error) {
    console.log(err);
  }
});

//complete todo
router.put("/api/todos/:todoId/update", async function(req, res) {
  try {
    let todo = await Todo.findById(req.params.todoId);
    todo.completed = !todo.completed;
    todo.save();
    console.log(todo);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//update/edit todo
router.put("/api/todos/:todoId/edit", async function(req, res) {
  try {
    let todo = await Todo.findByIdAndUpdate(req.params.todoId, req.body);
    console.log(todo);
    todo.name = req.body.name;
    todo.save();
    console.log("=====" + todo);
    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

//delete todo
router.delete("/api/todos/:todoId", async function(req, res) {
  try {
    let todo = await Todo.findByIdAndDelete(req.params.todoId);
    res.json({ message: "deleted the todo" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
