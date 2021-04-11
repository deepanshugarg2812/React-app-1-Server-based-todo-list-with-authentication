import React from 'react';
import './loggedIn.css';
import axios from 'axios';

class LoggedInTodos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item : '',
            items : []
        }
    }

    handleClick = (event) => {
        const params = new URLSearchParams()
        params.append('email',localStorage.getItem('email'));
        params.append('todoitem', this.state.item);
        axios.post('http://localhost:9990/todos_fun/addTodo',params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {this.componentDidMount();})
        .catch((err) => {alert("Server error")});

        this.setState({item : ''});
    }

    handleDelete = (event) => {
        const params = new URLSearchParams();
        params.append('id',parseInt(event.target.getAttribute('data-key')));
        
        axios.post('http://localhost:9990/todos_fun/deletetodo',params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {this.componentDidMount()})
        .catch((err) => {alert("Server error")});
    }

    componentDidMount(){
        const params = new URLSearchParams()
        params.append('email',localStorage.getItem('email'));
        axios.post('http://localhost:9990/todos_fun/getTodos',params,{headers : {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(response => {
            var arr = [];
            for(let i=0;i<response.data.length;i++){
                arr.push({id : response.data[i].id , value : response.data[i].value});
            }
            this.setState({items : arr});})
        .catch((error) => {alert("Server error")});
    }

    render(){
        const style1 = {
            height : window.innerHeight,
            width : window.innerWidth
          }
        var val = this.state.items.map((e) => <div onClick={this.handleDelete} key={e.id} data-key={e.id} className="row item">{e.value}</div>);
        return(<div className="box3" style={style1}>

            <div className="box3item1">
                <button className="box3item11" onClick={() => {this.props.handleChan(false)}}>Logout</button>
            </div>

            <div className="container box3item2">
                <div className="row">
                    <input className="form-control col-10" type="text" name="item" value={this.state.item} onChange={(event) => {this.setState({item : event.target.value})}} placeholder="Enter your todo item"/>
                    <div className="col-1"></div>
                    <button className="box3item22 col-1" onClick={this.handleClick}>+</button>
                </div>
            </div>

            <div className="container box3item2">
                {val}
            </div>
        </div>);
    }
}

export default LoggedInTodos;