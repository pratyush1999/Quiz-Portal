import React, { Component } from 'react';
import './App.css';
import {Login} from './Login'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Register from './Register';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      Login:false
    };
  }
  handleClick(event){
    const x=this.state.Login?false:true;
    this.setState({
      Login:x
    });
  }
  render() {
    if (this.state.Login) {
      return(
        <div>
      <MuiThemeProvider>
      <Login />
         <RaisedButton label="Register Now" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </MuiThemeProvider>
      </div>);
    }
    else
    {
      return(<div>
            <MuiThemeProvider>
          <Register />
          <RaisedButton label="Already User?,Sign in" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </MuiThemeProvider>
      </div>
      );
    }
}
}
const style = {
  margin: 15,
};