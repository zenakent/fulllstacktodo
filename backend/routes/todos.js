const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

//api todo
router.get("/api/todo", async function(req, res) {
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
router.post("/api/todo", async function(req, res) {
  try {
    let todo = await Todo.create(req.body);
    console.log(todo);
    res.json(todo);
  } catch (error) {
    console.log(err);
  }
});

//update todo
router.get("/:todoId/update", async function(req, res) {
  try {
    let todo = await Todo.findById(req.params.todoId);
    todo.completed = !todo.completed;
    todo.save();
    console.log(todo);
    res.json(todo);
  } catch (error) {
    console.log(err);
  }
});

//delete todo
router.delete("/:todoId", async function(req, res) {
  try {
    let todo = await Todo.findByIdAndDelete(req.params.todoId);
    res.json({ message: "deleted the todo" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
