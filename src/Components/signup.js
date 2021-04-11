import './login.css';
import React, { createRef } from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      email : '',
      password : ''
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
    axios.post('http://localhost:9990/login/signup',params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
    .then((response) => {alert(response.data);})
    .catch(error => {alert("Server error")});

    event.preventDefault();
  }

  render(){
    return (
      <div>
        <div className="box1"><div>Signup to your Todo List</div></div>
       
        <div className="box2">
          <input type="text" className="form-control boxitem" onChange={this.changeHappened} value={this.state.email} name="email" placeholder="Enter your email"/>
          <input type="password" className="form-control boxitem" onChange={this.changeHappened} value={this.state.password} name="password" placeholder="Enter your password"/>
          <button onClick={this.handleClick} className="col-12 btn btn-primary boxitem">Login</button>
        </div>
      </div>
    );
  };
};

export default Signup;
