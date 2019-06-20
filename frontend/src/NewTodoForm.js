import React, { Component } from "react";

class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { task: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addTodo(this.state.task);
    this.setState({ task: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="task"
          placeholder="Add a new todo here"
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    );
  }
}

export default NewTodoForm;
