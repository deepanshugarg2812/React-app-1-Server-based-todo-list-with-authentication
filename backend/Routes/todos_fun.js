const router = require('express').Router();
const {db , UsersVal , todoList} = require('../db');
const { route } = require('./login_signup');

function checkCred(email,item){
    if(email===undefined || item===undefined){
        return false;
    }
    else if(email.length<10 || item.length<5){
        return false;
    }
    return true;
}

router.post('/getTodos',async (req,res) => {
    var isCorrect = await checkCred(req.body.email,'Sample item');
    
    if(isCorrect==true){
        await todoList.findAll({where: {UsersTabEmail: req.body.email}})
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {res.send("Server error")});
    }
    else{
        res.send("Enter in correct format");
    }
});

router.post('/addTodo',async (req,res) => {
    var isCorrect = await checkCred(req.body.email,req.body.todoitem);

    if(isCorrect==true){
        await todoList.create({UsersTabEmail: req.body.email,value : req.body.todoitem})
        .then((result) => {res.send("Added")})
        .catch((err) => {res.send("Server error")});
    }
    else{
        res.send("Enter in correct format");
    }
});

router.post('/deletetodo',async (req, res) => {
    console.log(req.body);
    await todoList.destroy({where : {id : req.body.id}})
    .then((response) =>{res.send("Successfully deleted")})
    .catch((err) => {res.send("Server error")});
});

module.exports = router;