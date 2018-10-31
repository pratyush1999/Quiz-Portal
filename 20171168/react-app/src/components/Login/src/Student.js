import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import { Grid, Row, Cell } from 'react-inline-grid';
export default class Student extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      contactNo:'',
      Institute:''
    }
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
            <TextField
             hintText="Enter your contactNo"
             floatingLabelText="contactNo"
             type="string"
             onChange = {(event,newValue) => this.setState({contactNo:newValue})}
             />
           <br/>
            <TextField
             hintText="Enter your Institute Name"
             floatingLabelText="Institute"
             onChange = {(event,newValue) => this.setState({Institute:newValue})}
             />
           <br/>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};