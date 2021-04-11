const {db , UsersVal , todoList} = require('./db.js');
const app = require('./server.js');

var run = async () => {
    await db.sync({alter : true});
    await app.listen(9990,(req,res) => {console.log("server started");});
};

run();