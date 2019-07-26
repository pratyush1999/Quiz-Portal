import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
class ListQuestions extends Component {
  constructor(params) {
    super(params);
    this.state = {
      data: [],
      answer:[],
      qid:parseInt(params.match.params.qid),
      gid:parseInt(params.match.params.gid),
      NofAns:0,
      score:0,
      nam:JSON.parse(window.localStorage.getItem('username')),
      val:0,
    }
    this.handleClick=this.handleClick.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeInVal=this.handleChangeInVal.bind(this);
  }
   handleSubmit (event) {
    if (JSON.parse(window.localStorage.getItem('admin'))) {
    fetch(`http://localhost:8080/question/${this.state.val}`, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});

      });
              window.location.reload();
  }
}
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/question/'+this.state.qid);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
   }
    handleChangeInVal(event) {
  this.setState({
    val: event.target.value
  })};

  handleChange(event,x){
   var  newValue=event.target.value
   var temp=this.state.answer
  var index=temp.findIndex(
    p => p.id == x
    );
  var tval=this.state.NofAns;
  if (index==-1) {
   temp.push({id:x,ans:newValue})
   tval = tval + 1
  }
  else{
    temp[index]={id:x,ans:newValue}
  }
  this.setState({
    answer:temp,
    NofAns:tval
  });
}
handleClick(event){
  for (var i = 0; i < this.state.data.length; i++) {
    var x=this.state.data[i].id;
    var index=this.state.answer.findIndex(
    p => p.id == x
    );
    if (index!=-1&&this.state.answer[index].ans==this.state.data[i].answer) {
      this.state.score+=1
    }
  }
  //event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/score');
    fetch(request, {
     method: 'POST',
     body: JSON.stringify(this.state),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          {
            this.setState({submitted: true});
          }
        else
          alert('Unknown Error Occurred');
      });
  window.location.reload();
}
  render() {
    return (
      <div className="App">
       <MuiThemeProvider>
        <AppBar
             title="View All Questions"
           />
       <table className="table-hover">
          <thead>
            <tr>
            <th>Select For Deleting Question</th>
            <th>Click to Edit Question</th>
            <th>Question</th>
              <th>OptionA</th>
               <th>OptionB</th>
                <th>OptionC</th>
                 <th>OptionD</th>
                  <th>OptionE</th>
                  <th>Answer</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                    <td> <input type="radio" name="id" value={item.id}
              checked={this.state.val == item.id}
              onChange={this.handleChangeInVal}/></td>
               <td>
               <Link to ={"/EditQuestion/"+item.id}>
               Edit
                </Link>
               </td>
                  <td>
            {item.question}
               </td>
               <td>{item.optionA}</td>
               <td>{item.optionB}</td>
               <td>{item.optionC}</td>
               <td>{item.optionD}</td>
               <td>{item.optionE}</td>
               <td> <TextField
               type="answer"
               hintText="Enter your Answer OptionNos in Capital Letters without Spaces"
               floatingLabelText=""
               onChange = {(event) => this.handleChange(event,item.id)}
               /></td>
                  </tr>
                )
             },this)}
          </tbody>
       </table>
       <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
        <br/>
        <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit for deleting Question</button>
        </MuiThemeProvider>
       </div>
    );
  }
}
const style = {
  margin: 15,
};
export default ListQuestions;