import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { bindAll } from 'lodash';

import { Tasks } from '../api/tasks.js';

import NewTaskInput from './new-task-input.js';
import Task from './task.js';


class App extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this,
      'deleteTask',
      'submitNewTask',
      'toggleTaskChecked',
    );
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

  toggleTaskChecked(task) {
    Tasks.update(task._id, {
      $set: { checked: !task.checked },
    });
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
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
