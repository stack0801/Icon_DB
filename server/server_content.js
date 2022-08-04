const express = require('express')
const router = express.Router()
const sql_pool = require('./src/mysql')
const upload = require('./src/aws_multer').upload
const download = require('./src/aws_multer').download
//express 모듈을 불러옴
//express 모듈의 라우터 기능을 불러옴
//mysql.js에 있는 sql기능을 가져옴
//aws로 부터 업로드 할 수 있는 기능을 가져옴
//aws로 부터 다운로드 할 수 있는 기능을 가져옴

router.post('/get_contents', (req, res) => {
    const id = req.body.id
    const count = req.body.count
    //클라이언트에서 입력된 값들을 받아옴

    const sql = 'SELECT * FROM content order by content_id desc limit ?, ?'
    //DB에서 content_id를 순서에 맞게 content를 받아오는 쿼리문
    sql_pool.query(sql, [id, count], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

router.post('/get_content', (req, res) => {
    const id = req.body.content_id
    //클라이언트에서 입력된 값들을 받아옴

    const sql = 'SELECT * FROM content where content_id = ?'
    //DB에서 해당하는 content_id의 content를 받아오는 쿼리문
    sql_pool.query(sql, [id], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

router.post('/get_usercontent', (req, res) => {
    const id = req.body.id
    //클라이언트에서 입력된 값들을 받아옴

    const sql_getcontent = `SELECT * FROM content WHERE user_id = ?`
    //DB에서 해당하는 user_id의 content를 받아오는 쿼리문
    sql_pool.query(sql_getcontent, [id], (err_get, rows_get, result_get) => {
        if (err_get)
            console.log(err_get)
        else
            res.send(rows_get)
    })
})

router.post('/insert_content', upload.single('img'), (req, res) => {
    const id = req.session.sign
    const message = req.body.message
    const filename = req.filedirectory
    //클라이언트에서 입력된 값들을 받아옴

    const sql = 'insert into content(user_id, message, filename) values (?, ?, ?)'
    //DB에 클라이언트로 부터 받아온 id정보, 삽입할 문구, 파일이름을 content테이블에 삽입하는 쿼리문
    sql_pool.query(sql, [id, message, filename], (err, result) => {
        if (err)
            throw err
        else
            res.send("success")
    })
})

router.post('/search', (req, res) => {
    const sql = 'SELECT * FROM content where message LIKE' + " '%" + req.body.searchbox + "%' "
    //DB에서 클라이언트로 부터 받아온 검색할 문구와 유사한 내용이 포함되어 있는 content를 받아오는 쿼리문

    sql_pool.query(sql, (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

router.post('/content_delete', (req, res) => {
    const content_id = req.body.content_id
    //클라이언트에서 입력된 값들을 받아옴

    const sql = 'DELETE FROM content WHERE content_id = ?'
    //DB에 해당하는 content_id의 content를 제거하는 쿼리문
    sql_pool.query(sql, [content_id], (err, result) => {
        if (err)
            throw err
        else
            res.send("success")
    })

    // s3.deleteObject({
    //     Bucket: 'webservicegraduationproject',
    //     Key: 'img/' + content_id + '.png'
    // }, (err, data) => {
    //     if (err) { throw err; }
    // });
})

router.post('/content_update', (req, res) => {
    const content_id = req.body.content_id
    const content_message = req.body.content_message
    //클라이언트에서 입력한 값들을 받아옴

    const sql = 'UPDATE content SET message = ? WHERE content_id = ?'
    //DB에서 해당하는 content_id의 content의 문구를 클라이언트에서 받아온 내용으로 수정하는 쿼리문
    sql_pool.query(sql, [content_message, content_id], (err, result) => {
        if (err)
            throw err
        else
            res.send("success")
    })

    if (req.body.image != null) {
        s3.deleteObject({
            Bucket: 'webservicegraduationproject',
            Key: 'img/' + content_id + '.png'
            //수정시 이미지가 비어 있는 상태이면 aws에서 해당하는 버킷(이미지)를 제거
        }, (err, data) => {
            if (err) { throw err; }
        });

        upload.single('img')
        //수정된 이미지를 aws에 업로드
    }
})

router.get('/download/:key', (req, res) => { 
    const key = req.params.key
    download(req, res, key);
    //svg파일을 다운로드
})

module.exports = router