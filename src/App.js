import './App.css';
import React from 'react';
import Login from './Components/login';
import Signup from './Components/signup';
import LoggedInTodos from './Components/loggedInCompo';
import {Route, Switch , Link} from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedIn : false
    }
  }

  handleChangeLoggin = (val) => {
    this.setState({loggedIn : val});
  } 

  render(){
    const style1 = {
      height : window.innerHeight,
      width : window.innerWidth
    }

    var value = <div className="box" style={style1}>
    <Link className="boxitem1" to="/">Login</Link>
    <Link className="boxitem1" to="/signup">Signup</Link>
    <Switch>
    <Route exact path="/">
      <Login handleChan={this.handleChangeLoggin}/>
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>
    </Switch>
    </div>;
    
    if(this.state.loggedIn===true){
      value = <LoggedInTodos handleChan={this.handleChangeLoggin}></LoggedInTodos>
    }
    return(
      <div>

       {value}

      </div>
    );
  };
};

export default App;
