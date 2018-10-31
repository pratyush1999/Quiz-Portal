import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
class ListQuizzes extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      val:0,
      gid:params.match.params.gid,
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    handleSubmit (event) {
      if (JSON.parse(window.localStorage.getItem('admin'))) {
    fetch(`http://localhost:8080/quiz/${this.state.val}`, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        window.location.reload();

      });
  }
}
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz/'+this.state.gid);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
   handleChange(event) {
  this.setState({
    val: event.target.value
  })};
  render() {
    return (
      <div className="App">
       <MuiThemeProvider>
        <AppBar
             title="View All Quizzes"
           />
        <table className="table-hover">
          <thead>
            <tr>
            <th>Select for Deleting Quiz</th>
            <th>Type</th>
              <th>Quizzes</th>
              <th>Click to Add Question</th>
                  <th>Click to View Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                   <td> <input type="radio" name="id" value={item.id}
              checked={this.state.val == item.id}
              onChange={this.handleChange}/></td>
                  <td>
            {item.schoice}
               </td>
               <td>
               <Link to ={"/ListQuestions/"+item.id}>
            {item.qtitle}
            </Link>
               </td>
               <td>
               <Link to ={"/NewQuestion/"+item.id}>
            Add Question
            </Link>
               </td>
                <td>
                <Link to ={"/UserScoreboard/"+item.id}>
                View Score
                </Link>
               </td>
                  </tr>
                )
             },this)}
          </tbody>
       </table>
       <br />
        <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit for deletion</button>
        </MuiThemeProvider>
       </div>
    );
  }
}
const style = {
  margin: 15,
};
export default ListQuizzes;