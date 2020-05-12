import React, { Component } from "react";
import { v4 as uuid } from "uuid";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.input = React.createRef();
    this.state = {
      list: [],
    };
  }

  addTask = () => {
    const Items = {
      value: this.input.current.value,
    };

    if (localStorage.getItem("list") == null) {
      const list = [];
      while (list.length < 4) {
        list.push(Items);
      }

      localStorage.setItem("list", JSON.stringify(list));
    } else {
      const list = JSON.parse(localStorage.getItem("list"));

      list.push(Items);

      localStorage.setItem("list", JSON.stringify(list));
    }
    this.setState({
      list: JSON.parse(localStorage.getItem("list")),
    });
  };

  componentDidMount() {
    const list = window.localStorage.getItem("list");
    const parsedList = JSON.parse(list);
    if (list == null) {
      return false;
    } else {
      this.setState({
        list: parsedList,
      });
      console.log(this.state.list);
    }
  }

  deleteItem = (event) => {
    let index = event.target.getAttribute("data-key");
    let listValue = JSON.parse(localStorage.getItem("list"));
    listValue.splice(index, 1);
    this.setState({ list: listValue });
    localStorage.setItem("list", JSON.stringify(listValue));
  };

  render() {
    return (
      <div className="todosPanel">
        <div className="todos-title">Tasks List</div>
        <input
          className="task-input"
          type="text"
          placeholder="AddTask..."
          ref={this.input}
        />
        <button className='task-btn' onClick={this.addTask} >
          Add Task
        </button>
        <ol>
          {this.state.list.slice(0, 3).map((item, index) => {
            return (
              <li key={item.value}>
                {item.value}
                <button
                  className="task-btn"
                  type="button"
                  value="delete"
                  data-key={index}
                  onClick={this.deleteItem}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}

export default Tasks;
