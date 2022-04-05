const express = require('express')                      //express 모듈 사용
const app = express()                                   //express()를 app로 정의
const sql_pool = require('./mysql')                     //mysql.js 파일 로드
const session_stream = require('./session')             //session.js 파일 로드

app.use(express.static('Icon/'))
app.use(express.static('Front/'))                       //폴더를 클라이언트가 요청가능 (static)

app.use(express.json())
app.use(express.urlencoded({extended:false}))           //post 로 받은 값에서 req.body를 읽을 수 있게함 //근데 솔직히 뭔뜻인지 모르겠음
app.use(session_stream)                                 //session 사용

app.get('/', (req, res) => {                            // '/'주소로 요청받았을때
    res.sendFile(__dirname + '/Front/html/main.html')   // __dirname + '/Front/html/main.html' 주소의 파일을 넘겨줌
})

app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + '/Front/html/sign_up.html')
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

app.get('/sign_in', (req, res) => {
    res.sendFile(__dirname + '/Front/html/sign_in.html')
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
                req.session.sign = true
                res.send("success")
            }
            else          
                res.send("fail")
        })
    }
    else
        res.send("void")
})

app.post('/get_auth', (req, res) => {
    if (req.session.sign) 
        res.send("auth")
    else
        res.send("null")
})

app.listen(3000)