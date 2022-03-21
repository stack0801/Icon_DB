const express = require('express')
const app = express()
//const router = express.Router();

//static 으로
app.use(express.static('Front/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Front/html/index.html')
})

app.use(express.urlencoded({extended:false}));

app.post('/login', function(req, res, next){
    console.log(req.body);
    console.log(req.body.user_id);
    var id = req.body.user_id;
    var pwd = req.body.user_pwd;

    const mysql = require('mysql');
    var test = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '20172517',
        database: 'javateam'
    }

    var connection = mysql.createConnection(test); 
    connection.connect();  

    var testQuery = "insert into user (id, password, name, nickname) values('"+id+"', '"+pwd+"', 'test', 'tester1');";

    connection.query(testQuery, function (err, results, fields){
        if(err)
        {
            console.log(err);
        }         
        console.log(results);
    });

    connection.end();
})

//var x, y, c, d;
app.listen(3000)