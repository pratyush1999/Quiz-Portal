import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
class NewQuestion extends Component {
  constructor(params) {
    super();
    this.state = {
        question:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        optionE:"",
        answer:"",
        qid:parseInt(params.match.params.qid),
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleOAChange = this.handleOAChange.bind(this);
    this.handleOBChange = this.handleOBChange.bind(this);
    this.handleOCChange = this.handleOCChange.bind(this);
    this.handleODChange = this.handleODChange.bind(this);
    this.handleOEChange = this.handleOEChange.bind(this);
     this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    event.preventDefault();
    fetch('http://localhost:8080/question', {
     method: 'POST',
     body: JSON.stringify(this.state),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          { 
            alert('Question Added');
            this.setState({submitted: true});
          }
        else
          alert('Data entered is incorrect.Pls try again')
      });
  }
  handleQChange(event) {
    this.setState(
    {
      question :event.target.value
    });
  }
  handleOAChange(event) {
    this.setState(
    {
      optionA :event.target.value
    });
  }
  handleOBChange(event) {
    this.setState(
    {
    optionB :event.target.value
    });
  }
  handleOCChange(event) {
    this.setState(
    {
      optionC :event.target.value
    });
  }
  handleODChange(event) {
    this.setState(
    {
     optionD :event.target.value
    });
  }
  handleOEChange(event) {
    this.setState(
    {
      optionE :event.target.value
    });
  }
  handleAnswerChange(event) {
    this.setState(
    {
     answer :event.target.value
    });
  }
  render() {
    return (<div>
            <MuiThemeProvider>
            <AppBar
             title="AddQuestion"
           />
           <TextField
             hintText="Enter Question"
             floatingLabelText="Question"
             onChange = {this.handleQChange}
             />
           <br/>
           <TextField
             hintText="Enter Option A"
             type="A"
             floatingLabelText="A"
             onChange = {this.handleOAChange}
             />
             <br />
          <TextField
             hintText="Enter Option B"
             type="B"
             floatingLabelText="B"
             onChange = {this.handleOBChange}
             />
              <br />
             <TextField
             hintText="Enter Option C"
             type="C"
             floatingLabelText="C"
             onChange = {this.handleOCChange}
             />
              <br />
             <TextField
             hintText="Enter Option D"
             type="D"
             floatingLabelText="D"
             onChange = {this.handleODChange}
             />
            <br />
             <TextField
             hintText="Enter Option E"
             type="E"
             floatingLabelText="E"
             onChange = {this.handleOEChange}
             />
           <br/>
           <br/>
           <TextField
             hintText="Enter Answer Options in Capital Letters Without Spaces"
             type="Answer Options"
             floatingLabelText=""
             onChange = {this.handleAnswerChange}
             />
           <br/>
           <RaisedButton label="Add Question" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </MuiThemeProvider>
         </div>    
    );
  }
}
const style={
  margin:15
};

export default NewQuestion;