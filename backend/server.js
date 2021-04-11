const { urlencoded } = require('express');
const express = require('express');
const app = express();
var cors = require('cors')

//Other custum js scripts
const route1 = require('./Routes/login_signup');
const route2 = require('./Routes/todos_fun');

//Middleware top
app.use(urlencoded({extended : true}));
app.use(cors());

app.use('/login',route1); //For the login signup operations
app.use('/todos_fun',route2); //for todo list operations

exports = module.exports = app;