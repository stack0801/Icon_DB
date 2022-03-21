const mysql = require('mysql');
var test = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '20172517',
    database: 'javateam'
}

var connection = mysql.createConnection(test); // DB 커넥션 생성
connection.connect();   // DB 접속

var testQuery = "insert into user (id, password, name, nickname) values('test', '1234', 'test', 'tester1');";

connection.query(testQuery, function (err, results, fields){
    if(err)
    {
        console.log(err);
    }   
    console.log(results);
});

testQuery = "SELECT * FROM user";

connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
});
 
connection.end(); // DB 접속 종료