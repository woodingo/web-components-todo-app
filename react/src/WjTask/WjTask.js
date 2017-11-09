import React, { Component } from 'react';
import './WjTask.css';
import restApi from '../restApiClass.js'

class WjTask extends Component {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      taskStatus: 'notDone'
    }
  }

  static defaultProps = {
    item: {
      name: 'Имя не определено',
      id: null
    }
  }

  clickHandler() {
    this.setState({taskStatus: 'done'});
    setTimeout(() => {
      restApi.deleteTask(this.props.item.id).then(response => {
        if (response.status === 401) {
          restApi.logIn();
        } else {
          response.json().then(json => {
            this.props.update();
          })
        }
      })
    }, 200);
  }

  render() {
    return (
      <div className={"wj-task " + this.state.taskStatus}>
        <div className="row">
          <div className="checkbox" onClick={this.clickHandler}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" enableBackground="new 0 0 26 26">
              <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/>
            </svg>
          </div>
          <div className="text">
            {this.props.item.name}
          </div>
        </div>
      </div>
    );
  }
}

export default WjTask;
