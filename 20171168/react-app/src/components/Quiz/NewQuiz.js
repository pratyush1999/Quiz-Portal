import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NewQuestion from '../Questions/NewQuestion';
class NewQuiz extends Component {
  constructor(params) {
    super(params);
    this.state = {   
        qtitle:"",
        schoice :"",
        gid:parseInt(params.match.params.gid),
        submitted: false,
  }
    this.handleClick = this.handleClick.bind(this);
    this.handleQuizChange=this.handleQuizChange.bind(this);
    this.handleChoiceChange=this.handleChoiceChange.bind(this);
  }
  handleClick (event) {
   event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/quiz');
    fetch(request, {
     method: 'POST',
     body: JSON.stringify(this.state),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          {
            this.setState({submitted: true});
            alert('Quiz Created');
          }
        else
          alert('Data entered is incorrect.Pls try again')
      });
  }
  handleQuizChange(event) {
    this.setState(
    {
      qtitle:event.target.value
    });
  }
 handleChoiceChange(event) {
  this.setState({
    schoice: event.target.value
  });
}
  render() {
    return (<div>
            <MuiThemeProvider>
            <AppBar
             title="NewQuiz"
           />
            <br />
            <b>Choose Type</b>
             <br />
             <label>
            <input type="radio" name="Singlechoice" value="Singlechoice"
              checked={this.state.schoice == "Singlechoice"}
              onChange={this.handleChoiceChange}/>
              Singlechoice
              </label>
            <label>
            <input type="radio" name="MultipleChoice" value="MultipleChoice"
              checked={this.state.schoice == "MultipleChoice"}
              onChange={this.handleChoiceChange}/>
             MultipleChoice
            </label>
            <br />
             <TextField
             hintText="Enter Quiz title"
             floatingLabelText="Quiz title"
             onChange = {this.handleQuizChange}
             />
             <br />
          <RaisedButton label="Create Quiz" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </MuiThemeProvider>
         </div>    
    );
  }
}
const style={
  margin:15,
};

export default NewQuiz;