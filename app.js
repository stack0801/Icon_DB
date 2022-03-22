const express = require('express')                      //express 모듈 사용
const axios = require('axios')                          //axios 모듈 사용
const app = express()                                   //express()를 app로 정의
const connection = require('./mysql')                   //mysql.js 파일 로드

app.use(express.static('Front/'))                       //Front 폴더를 클라이언트가 요청가능 (static)

app.use(express.json())
app.use(express.urlencoded({extended:false}))           //post 로 받은 값에서 request.body를 읽을 수 있게함 //근데 솔직히 뭔뜻인지 모르겠음

app.get('/', (req, res) => {                            // '/'주소로 요청받았을때
    res.sendFile(__dirname + '/Front/html/login.html')  // __dirname + '/Front/html/index.html' 주소의 파일을 넘겨줌
})

app.post('/login', (request, response) => {

    const username = request.body.id
    const password = request.body.pw

    console.log(request.body)

    if (username && password) {
        connection.query('SELECT * FROM user WHERE id = ? AND password = ?', [username, password], (error, results, fields) => {
            if (error)
                throw error
            if (results.length > 0)
                response.send("success")
            else          
                response.send("fail")      
        })
    }
    else
        response.send("void")
})

app.listen(3000)