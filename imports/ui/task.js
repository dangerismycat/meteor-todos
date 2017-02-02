import React, { PropTypes } from 'react';


function Task(props) {
  return <li>{props.task.text}</li>;
}

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
};

export default Task;
