import React, { Component } from 'react';
import './WjTaskList.css';
import WjTask from '../WjTask/WjTask'

class WjTaskList extends Component {

  static defaultProps = {
    tasks: []
  }

  render() {
    return (
      <div className="wj-task-list">
         {this.props.tasks.reverse().map(element => <WjTask key={element.id} item={element} update={this.props.update}/>)}
      </div>
    );
  }
}

export default WjTaskList;
