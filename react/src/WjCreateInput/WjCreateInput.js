import React, { Component } from 'react';
import './WjCreateInput.css';

import restApi from '../restApiClass.js'

class WjCreateInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: ''
    }
    this.changeInput = this.changeInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  changeInput(e) {
    this.setState({taskName: e.target.value});
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      restApi.createTask(this.state.taskName).then(response => {
        if (response.status === 401) {
          restApi.logIn();
        } else {
          response.json().then(json => {
            this.setState({taskName: ''})
            this.props.update();
          })
        }
      });
    }
  }

  render() {
    return (
      <div className="wj-create-input">
        <input type="text" className="input" onKeyPress={this.handleKeyPress} onChange={this.changeInput} value={this.state.taskName} />
      </div>
    );
  }
}

export default WjCreateInput;
