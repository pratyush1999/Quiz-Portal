import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component } from 'react';
export  class Login extends Component {
constructor(props){
  super(props);
  this.state={
  name:'',
  password:'',
  submitted:false,
  admin:false,
  data:[],
  }
  this.handleClick=this.handleClick.bind(this);
 }
 handleClick (event) {
    event.preventDefault();
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          {
            this.setState({submitted: true});
            localStorage.setItem("loggedIn",JSON.stringify(this.state.submitted));
            localStorage.setItem("username",JSON.stringify(this.state.name));
            if (this.state.name=="pratyush") {
              this.setState({admin: true});
               localStorage.setItem("admin",JSON.stringify(this.state.admin)) ;
            }
          }
          else
            alert('Data entered was incorrect.Please Try Again')
      }) 
       window.location.reload();
}
render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
          <form>
           <TextField
             hintText="Enter your username"
             type="Name"
             floatingLabelText="Name"
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </form>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};