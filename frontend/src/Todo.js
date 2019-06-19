import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, task: this.props.task };

    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleRemove() {
    this.props.removeTodo(this.props.id);
  }

  handleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleComplete() {
    this.props.completeTodo(this.props.id);
  }

  handleEditTodo(evt) {
    evt.preventDefault();
    this.props.editTodo(this.props.id, this.state.task);
    this.handleEdit();
  }

  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <form onSubmit={this.handleEditTodo}>
          <label>Edit Todo: </label>
          <input
            onChange={this.handleChange}
            value={this.state.task}
            name="task"
            type="text"
          />
          <button>Submit</button>
        </form>
      );
    } else {
      result = (
        <div>
          <button onClick={this.handleEdit}>Edit</button>
          <button onClick={this.handleRemove}>X</button>
          <li onClick={this.handleComplete}>{this.state.task}</li>
        </div>
      );
    }
    return result;
  }
}

export default Todo;
