const Sequelize = require('sequelize');
const db = new Sequelize('todos','todouser','mypass',{
    host : 'localhost',
    dialect : 'mysql'
})

//testing
// console.log(db);

//Creating a users table
const UsersVal = db.define('UsersTabs',{
    email : {
        type : Sequelize.DataTypes.STRING(500),
        allowNull : false,
        primaryKey : true
    },
    password : {
        type : Sequelize.DataTypes.STRING(500),
        allowNull : false
    }
});

const todoList = db.define('todoslist',{
    value : {
        type : Sequelize.DataTypes.STRING(500),
        allowNull : false
    }
});

//Setting the relationships
UsersVal.hasMany(todoList); //one to many 

//Create tables run
exports = module.exports = {
    db , UsersVal , todoList
}