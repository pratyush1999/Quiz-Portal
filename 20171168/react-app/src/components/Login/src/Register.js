import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      submitted:false,
      loggedIn:false,
      admin:false,
    }
    this.handleClick=this.handleClick.bind(this);
  }
handleClick (event) {
    event.preventDefault();
    fetch('http://localhost:8080/signup', {
     method: 'POST',
     body: JSON.stringify(this.state),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          {
            this.setState({submitted: true});
            localStorage.setItem("admin",JSON.stringify(this.state.admin)) ;
            localStorage.setItem("loggedIn",JSON.stringify(this.state.loggedIn));
            localStorage.setItem("username",this.state.name);
            window.location.reload();
          }
          else
            alert('Data entered was incorrect.Please Register Again')
      });
  }
  render() {
      return (<div>
            <MuiThemeProvider>
            <AppBar
             title="Register"
           />
           <TextField
             hintText="Enter your Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
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
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </MuiThemeProvider>
      </div>
    );
}
}
const style = {
  margin: 15,
};