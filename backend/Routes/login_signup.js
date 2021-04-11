const router = require('express').Router();
const {db , UsersVal , todoList} = require('../db');

//Functions to check for email and password
function checkCredentials(email,password){
    if(email===undefined || password===undefined){
        return false;
    }
    else if(email.length<10 || password.length<5){
        return false;
    }
    return true;
}

router.post('/login',async (req,res) => {
    var isCorrectCor = await checkCredentials(req.body.email,req.body.password);

    if(isCorrectCor==true){
        await UsersVal.findOne({where: {email : req.body.email}})
        .then((response) => {
            
            //if null return false
            if(response===null){
                res.send("Wrong email or password");
            }
            else{
                if(response.dataValues.password===req.body.password){
                    res.send("Success");
                }
                else{
                    res.send("Wrong email or password");
                }
            }

        })
        .catch((err) => {
            res.send("Server error");
        })
    }
    else{
        res.send("Enter email or password in correct format");
    }
});



router.post('/signup',async (req, res) => {
    var isCorrectCor = await checkCredentials(req.body.email,req.body.password);
    
    if(isCorrectCor==true){
        await UsersVal.findOne({where: {email : req.body.email}})
        .then(async (response) => {
            
            //if null return false
            if(response===null){
                
                await UsersVal.create({
                    email : req.body.email,
                    password : req.body.password
                })
                .then((response) => {
                    res.send("Success");
                }).catch((err) => {res.send("Server error")});

            }
            else{
                res.send("Email already exists");
            }

        })
        .catch((err) => {
            res.send("Server error");
        })
    }
    else{
        res.send("Enter email or password in correct format");
    }
})


module.exports = router;