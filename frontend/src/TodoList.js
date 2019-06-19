import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import * as apiCall from "./api";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);
  }

  async componentDidMount() {
    let todos = await apiCall.getTodos();
    this.setState({ todos });
  }

  async addTodo(val) {
    let newTodo = await apiCall.createTodo(val);
    this.setState({ todos: [...this.state.todos, newTodo] });
  }

  async deleteTodo(id) {
    await apiCall.removeTodo(id);
    this.setState({
      todos: this.state.todos.filter(todo => todo._id !== id)
    });
  }

  async completeTodo(id) {
    let res = await apiCall.completeTodo(id);
    const updatedTodo = this.state.todos.map(todo => {
      if (todo.id === res.id) {
        return { ...todo, completed: res.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodo });
  }

  async editTodo(id, updatedTask) {
    let res = await apiCall.editTodo(id, updatedTask);
    console.log(res);
    const editedTodo = this.state.todos.map(todo => {
      if (todo.id === res.id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: editedTodo });
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <Todo
          task={todo.name}
          key={todo._id}
          id={todo._id}
          completed={todo.completed}
          editTodo={this.editTodo}
          removeTodo={this.deleteTodo}
          completeTodo={this.completeTodo}
        />
      );
    });
    return (
      <div>
        <h1>TodoList!</h1>
        <NewTodoForm addTodo={this.addTodo} />
        {todos}
      </div>
    );
  }
}

export default TodoList;
