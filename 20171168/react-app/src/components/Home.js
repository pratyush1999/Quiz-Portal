import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'
import AppLogin from './Login/src/AppLogin'
class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to QUIZ</h1>
        </header>
        <AppLogin />
      </div>
    );
  }
}

export default Home;
