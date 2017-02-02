import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { bindAll } from 'lodash';

import { Tasks } from '../api/tasks.js';

import HideCompletedCheckbox from './hide-completed-checkbox.js';
import NewTaskInput from './new-task-input.js';
import Task from './task.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this,
      'deleteTask',
      'submitNewTask',
      'toggleHideCompleted',
      'toggleTaskChecked',
    );

    this.state = {
      hideCompleted: false,
    };
  }

  deleteTask(task) {
    Tasks.remove(task._id);
  }

  submitNewTask(task) {
    Tasks.insert({
      text: task,
      createdAt: new Date(),
    });
  }

  toggleHideCompleted() {
    this.setState({ hideCompleted: !this.state.hideCompleted });
  }

  toggleTaskChecked(task) {
    Tasks.update(task._id, {
      $set: { checked: !task.checked },
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;

    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter((task) => !task.checked);
    }

    return filteredTasks.map((task) => (
      <Task
        key={task._id}
        task={task}
        deleteTask={this.deleteTask}
        toggleTaskChecked={this.toggleTaskChecked}
      />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Tödös ({this.props.incompleteCount} to go)</h1>
          <HideCompletedCheckbox
            hideCompleted={this.state.hideCompleted}
            toggleHideCompleted={this.toggleHideCompleted}
          />
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
  incompleteCount: PropTypes.number.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
}, App);
