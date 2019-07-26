import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import EditPerson from './EditPerson';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ListQuizzes from './ListQuizzes'
import ListGenre from './ListGenre'
import ListQuestions from './ListQuestions'
import NewQuiz from './Quiz/NewQuiz'
import NewQuestion from './Questions/NewQuestion'
import LogOut from './Login/src/LogOut'
import EditQuestion from './EditQuestion'
import UserScoreboard from './UserScoreboard'
import Overall_Scoreboard from './Overall_Scoreboard'
import GenreScoreboard from './GenreScoreboard'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                {  !JSON.parse(window.localStorage.getItem('loggedIn')) &&
                  <Link className="navbar-brand" to={'/'}>Home</Link>
                }
                </div>
              {  JSON.parse(window.localStorage.getItem('loggedIn')) &&
              JSON.parse(window.localStorage.getItem('admin'))&&
                <ul className="nav navbar-nav">
                  <li><Link to={'/EditPerson'}>Edit Person</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  </ul>
              }
                {  JSON.parse(window.localStorage.getItem('loggedIn')) &&
                  <ul className="nav navbar-nav">
                  <li><Link to={'/ListGenre'}>ListGenre</Link></li>
                  <li><Link to={'/Overall_Scoreboard'}>Overall_Scoreboard</Link></li>
                  <li><Link to={'/LogOut'}>LogOut</Link></li>
                </ul>
              }
              </div>
            </nav>
            <Switch>
            {  !JSON.parse(window.localStorage.getItem('loggedIn')) &&
                <div>
                 <Route exact path='/' component={Home} />
                 </div>
            }
                  {  JSON.parse(window.localStorage.getItem('loggedIn')) &&
                  JSON.parse(window.localStorage.getItem('admin'))&&
                  <div>
                 <Route exact path='/EditPerson' component={EditPerson} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                  <Route exact path='/NewQuiz/:gid' component={NewQuiz} />
                  <Route exact path='/NewQuestion/:qid' component={NewQuestion} />
                   <Route exact path='/ListGenre' component={ListGenre} />
                 <Route exact path='/LogOut' component={LogOut} />
                 <Route exact path='/ListQuizzes/:gid' component={ListQuizzes} />
                 <Route exact path='/ListQuestions/:gid/:qid' component={ListQuestions} />
                  <Route exact path='/EditQuestion/:qid' component={EditQuestion} />
                   <Route exact path='/UserScoreboard/:gid/:qid' component={UserScoreboard} />
                  <Route exact path='/Overall_Scoreboard' component={Overall_Scoreboard} />
                  <Route exact path='/GenreScoreboard/:gid' component={GenreScoreboard} />
                  </div>
                }
                 { JSON.parse(window.localStorage.getItem('loggedIn')) &&
                 <div>
                 <Route exact path='/ListGenre' component={ListGenre} />
                 <Route exact path='/LogOut' component={LogOut} />
                 <Route exact path='/ListQuizzes/:gid' component={ListQuizzes} />
                 <Route exact path='/ListQuestions/:gid/:qid' component={ListQuestions} />
                  <Route exact path='/UserScoreboard/:gid/:qid' component={UserScoreboard} />
                  <Route exact path='/Overall_Scoreboard' component={Overall_Scoreboard} />
                  <Route exact path='/GenreScoreboard/:gid' component={GenreScoreboard} />
                  </div>
                  }
                }
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;