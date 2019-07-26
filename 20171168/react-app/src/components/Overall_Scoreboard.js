import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
class UserScoreboard extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      qid:parseInt(params.match.params.qid),
      gid:parseInt(params.match.params.gid)
    }
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/scoreboard');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    }
  render() {
    return (
      <div className="App">
       <MuiThemeProvider>
        <AppBar
             title="Overall_Scoreboard"
           />
        <table className="table-hover">
          <thead>
            <tr>
            </tr>
          </thead>
          {this.state.data.length>0 && 
        <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                  <td>
              {item.nam}
               </td>
                 <td>
              {item.total}
               </td>
                  </tr>
                )
             },this)}
          </tbody>
        }
         {this.state.data.length==0 && 
        <tbody>
        <br />
        Not records
          </tbody>
        }
       </table>
       <br />
        </MuiThemeProvider>
       </div>
    );
  }
}
const style = {
  margin: 15,
};
export default UserScoreboard;