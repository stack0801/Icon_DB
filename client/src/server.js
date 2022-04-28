const express = require("express")
const app = express()
const port = 5000
const cors =require("cors")
const bodyParser=require("body-parser")
const mysql=require("mysql")

var connection=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"100001",
    database:"bbag"
})
connection.connect();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/App.js')
})

app.get('/sign_in',(req,res)=>{
    res.sendFile(__dirname+"\LoginPage.js")
})

app.post('/sign_in', (req, res) => {
    const id = req.body.id
    const password = req.body.pw

    if (id && password) {
        const sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        sql_pool.query(sql, [id, password], (err, result) => {
            if (err)
                throw err
            if (result.length > 0) {
                req.session.sign = id
                res.send("success")
            }
            else          
                res.send("fail")
        })
    }
    else
        res.send("void")
})

app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + '\RegisterPage.js')
})

app.post('/sign_up', (req, res) => {
    const id = req.body.id
    const password = req.body.pw
    const nickmane = req.body.nickmane

    if (id && password && nickmane) {
        const sql = 'INSERT INTO user VALUES(?, ?, ?)'
        sql_pool.query(sql, [id, password, nickmane], (err, result) => {
            if (err)
                res.send("fail")
            else          
                res.send("success")
        })
    }
    else
        res.send("void")
})

app.listen(5000)