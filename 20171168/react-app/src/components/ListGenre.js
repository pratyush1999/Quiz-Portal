import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
class ListGenre extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      gid:"",
    }
    this.handleChange=this.handleChange.bind(this);
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genre/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
   handleChange(event) {
  this.setState({
    gid: event.target.value
  });
}
handleClick(event){
  this.setState({
    gid: event.target.value
  });
}
  render() {
    return (
      <div className="App">
       <MuiThemeProvider>
        <AppBar
             title="View All Genres"
           />
        <table className="table-hover">
          <thead>
            <tr>
              <th>Genres</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
               <td>
               <Link to ={"/ListQuizzes/"+item.id}> {item.GenerName}</Link>
               </td>
               <td>
               <Link to={"/NewQuiz/"+item.id}>Add Quiz</Link>
               </td>
                  </tr>
                )
             },this)}
          </tbody>
       </table>
        </MuiThemeProvider>
       </div>
    );
  }
}
const style = {
  margin: 15,
};
export default ListGenre;
