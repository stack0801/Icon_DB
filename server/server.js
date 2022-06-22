const express = require('express')
const session_stream = require('./src/session')
const https = require('https')
const fs = require('fs')

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
}

const server_user = require('./server_user')
const server_tag = require('./server_tag')
const server_like = require('./server_like')
const server_content = require('./server_content')
const server_follow = require('./server_follow')

const app = express()
const HTTPS_PORT = 5000

app.get('/', (req, res) => {
    res.json({message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` })
})

app.use(express.json())                                 //json 방식으로 통신
app.use(express.urlencoded({ extended: false }))        //post 로 받은 값에서 req.body를 읽을 수 있게함 //근데 솔직히 뭔뜻인지 모르겠음
app.use(session_stream)

app.use(server_user)
app.use(server_tag)
app.use(server_like)
app.use(server_content)
app.use(server_follow)

https.createServer(options, app).listen(HTTPS_PORT)