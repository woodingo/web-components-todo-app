import React, { Component } from 'react';
import './App.css';

import WjTaskList from './WjTaskList/WjTaskList'
import WjCreateInput from './WjCreateInput/WjCreateInput'

import restApi from './restApiClass.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    restApi.getTasks().then(response => {
      if (response.status === 401) {
        restApi.logIn();
      } else {
        response.json().then(json => {
          this.setState({tasks: json.data})
        });
      }
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>
            Web Components TODO-Application
            <div className="subtitle">
              Special for FrontCamp Autumn 2017
            </div>
          </h1>
        </header>
        <main>
          <WjCreateInput update={this.getTasks} />
          <WjTaskList update={this.getTasks} tasks={this.state.tasks} />
        </main>
      </div>
    );
  }
}

export default App;
