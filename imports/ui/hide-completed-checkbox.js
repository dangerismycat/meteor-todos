import React, { PropTypes } from 'react';


function HideCompletedCheckbox(props) {
  return (
    <label className="hide-completed">
      <input
        type="checkbox"
        readOnly
        checked={props.hideCompleted}
        onClick={props.toggleHideCompleted}
      />
      Hide Completed Tasks
    </label>
  );
}

HideCompletedCheckbox.propTypes = {
  hideCompleted: PropTypes.bool.isRequired,
  toggleHideCompleted: PropTypes.func.isRequired,
};

export default HideCompletedCheckbox;
