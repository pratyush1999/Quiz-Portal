import React, { Component } from 'react';
//import './NewPerson.css';

class NewGenre extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        gname:""
      },
      submitted: false,
    }
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/genre', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }
  handleGChange(event) {
    this.setState(
        { 
          formData:{gname : event.target.value}
        });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Genre</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleGChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {this.state.submitted &&
          <div>
            <h2>
              New Genre successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
      </div>
    );
  }
}

export default NewGenre;