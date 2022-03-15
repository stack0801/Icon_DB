const express = require('express')
const app = express()

//static 으로
app.use(express.static('Front/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/Front/html/index.html')
})
//var x, y, c;
app.listen(3000)