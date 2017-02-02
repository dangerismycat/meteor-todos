import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';


class NewTaskInput extends React.Component {
  constructor(props) {
    super(props);

    bindAll(this,
      'handleChange',
      'handleSubmit',
      'resetInput',
    );

    this.state = {
      inputText: 'Type to add new tasks',
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ inputText: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitNewTask(this.state.inputText);
    this.setState({ inputText: 'Success!' });
    setTimeout(this.resetInput, 1000);
  }

  resetInput() {
    this.setState({ inputText: 'Type to add new tasks' });
  }

  render() {
    return (
      <form className="new-task" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.inputText} onChange={this.handleChange} />
      </form>
    );
  }
}

NewTaskInput.propTypes = {
  submitNewTask: PropTypes.func.isRequired,
};

export default NewTaskInput;
