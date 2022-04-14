var express = require('express')
var router = express.Router()
const sql_pool = require('./mysql')  
var fs = require('fs')
var ejs = require('ejs')
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

router.get("/boardtest_insert", function (req, res) {
    console.log("삽입 페이지 나와라")
    
    fs.readFile('insert.html', 'utf-8', function (error, data) {
    res.send(data)
    })    
})

router.post("/boardtest_insert", function (req, res) {
    console.log("삽입 포스트 데이터 진행")
    var body = req.body;
    sql_pool.query('insert into content(user_id,message) values (?,?,?)', [body.name, body.num, body.section], function () {
    res.redirect('/');
    })
})
    