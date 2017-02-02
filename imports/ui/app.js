import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import NewTaskInput from './new-task-input.js';
import Task from './task.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.submitNewTask = this.submitNewTask.bind(this);
  }

  submitNewTask(task) {
    Tasks.insert({
      text: task,
      createdAt: new Date(),
    });
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Tödös</h1>
          <NewTaskInput submitNewTask={this.submitNewTask} />
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({},
      { sort: { createdAt: -1 } }
    ).fetch(),
  };
}, App);
