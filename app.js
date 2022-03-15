const express = require('express')
const app = express()

//static 으로
app.use(express.static('Front/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Front/html/index.html')
})

//ㄴㅇ루닝륌ㅈ움주어ㅏㅝㅏㅣㅁㅇㅁㅈㅇ
//ㅎㄴㄴㅇㅎㅇㄶㄴㅇㅎ/ㅁㅈㅇㅁㅈㅇㅇ로fdjsfsd

app.listen(3000)