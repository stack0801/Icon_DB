const express = require('express')
const session_stream = require('./src/session')
//express 모듈을 불러옴
//로그인을 세션처리 할 수 있는 모듈을 불러옴


const server_user = require('./server_user')
const server_tag = require('./server_tag')
const server_like = require('./server_like')
const server_content = require('./server_content')
const server_follow = require('./server_follow')
//server에서 필요한 기능을 구동하기 위한 모듈들을 선언

const app = express()
const HTTP_PORT = 5000

app.get('/', (req, res) => {
    res.json({message: `Server is running on port ${HTTP_PORT}` })
})

app.use(express.json())                                 //json 방식으로 통신
app.use(express.urlencoded({ extended: false }))        //post 로 받은 값에서 req.body를 읽을 수 있게함 //근데 솔직히 뭔뜻인지 모르겠음
app.use(session_stream)

app.use(server_user)
app.use(server_tag)
app.use(server_like)
app.use(server_content)
app.use(server_follow)

const svg = require('./src/aws_multer').svg
app.get('/get_xml/:key', async(req, res) => {
    const key = req.params.key + '.svg'
    svg(req, res, key)
})

https.createServer(app).listen(HTTP_PORT)