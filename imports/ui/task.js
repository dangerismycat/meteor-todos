import React, { PropTypes } from 'react';
import classnames from 'classnames';


function Task(props) {
  const { deleteTask, showPrivateButton, task, togglePrivateButton, toggleTaskChecked } = props;
  const taskClassName = classnames({
    checked: task.checked,
    private: task.private,
  });

  const privateButtonText = task.private ? 'Private' : 'Public';
  const privateButton = showPrivateButton ? (
    <button className="toggle-private" onClick={() => togglePrivateButton(task)}>
      {privateButtonText}
    </button>
  ) : '';

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

      {privateButton}

      <span className="text">
        <strong>{task.username}</strong>: {task.text}
      </span>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    createdAt: PropTypes.date,
    owner: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
  togglePrivateButton: PropTypes.func.isRequired,
  toggleTaskChecked: PropTypes.func.isRequired,
};

export default Task;
