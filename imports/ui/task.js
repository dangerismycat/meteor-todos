import React, { PropTypes } from 'react';


function Task(props) {
  const { deleteTask, task, toggleTaskChecked } = props;
  const taskClassName = task.checked ? 'checked' : '';

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={() => deleteTask(task)}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={task.checked}
        onClick={() => toggleTaskChecked(task)}
      />

      <span className="text">
        <strong>{task.username}</strong>: {task.text}
      </span>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskChecked: PropTypes.func.isRequired,
};

export default Task;
