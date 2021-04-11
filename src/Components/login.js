import './login.css';
import React, { createRef } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email : '',
      password : '',
    }
  }

  changeHappened = (event) => {
    let inputType = event.target.name;
    if(inputType=='password'){
      this.setState({password : event.target.value});
    }
    else{
      this.setState({email : event.target.value});
    }
  }

  handleClick = (event) => {
    const params = new URLSearchParams()
    params.append('email', this.state.email);
    params.append('password', this.state.password);
    axios.post('http://localhost:9990/login/login',params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then((response) => {
      if(response.data=="Success"){
        localStorage.setItem("email",`${this.state.email}`);
        this.props.handleChan(true);
      }
      else{alert(response.data);}
    })
    .catch(error => {alert("Server error")});    
  }

  render(){
    return (
      <div>
        <div className="box1"><div>Login to your Todo List</div></div>
       
        <div className="box2">
          <input type="text" className="form-control boxitem" onChange={this.changeHappened} value={this.state.email} name="email" placeholder="Enter your email"/>
          <input type="password" className="form-control boxitem" onChange={this.changeHappened} value={this.state.password} name="password" placeholder="Enter your password"/>
          <button onClick={this.handleClick} className="col-12 btn btn-primary boxitem">Login</button>
        </div>
      </div>
    );
  };
};

export default Login;
