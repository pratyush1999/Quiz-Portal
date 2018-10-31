import React, { Component } from 'react';
import './ViewPeople.css';

class DeletePeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      val:0,
      submitted: false
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    fetch(`http://localhost:8080/users/${this.state.val}`, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        window.location.reload();

      });
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/users/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleChange(event) {
  this.setState({
    val: event.target.value
  });
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DELETE USERS</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Email-ID</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                  <td> <input type="radio" name="id" value={item.id}
              checked={this.state.val == item.id}
              onChange={this.handleChange}/></td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                  </tr>
                )
             },this)}
          </tbody>
       </table>
        <button type="submit" className="btn btn-default">Submit</button>
         </form>
      </div>
    );
  }
}

export default DeletePeople;
