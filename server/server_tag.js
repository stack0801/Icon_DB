const express = require('express')
const router = express.Router()
const sql_pool = require('./src/mysql')
//express 모듈을 불러옴
//express 모듈의 라우터 기능을 불러옴
//mysql.js에 있는 sql기능을 가져옴

router.post('/tag_insert', (req, res) => {
    const content_id = req.body.content_id
    const tag_context = req.body.tag_context
    //클라이언트에서 입력된 값들을 받아옴

    const sql_InsertHash = "INSERT INTO Hash(Hashtag) VALUES ('" + tag_context + "')"
    //클라이언트에서 받아온 내용으로 태그를 생성하는 쿼리문
    sql_pool.query(sql_InsertHash, (err_InsertHash, result_InsertHash) => {
        const sql_Hashtag = 'SELECT * FROM Hash WHERE Hashtag = ?'
        //해당하는 해시태그가 이미 있는지 확인하는 쿼리문
        sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, rows_Hash, result_Hash) => {
            const Hash_idx = rows_Hash[0].Hash_id
        
            const sql_content_tag = 'INSERT INTO content_has_hash(content_idx, Hash_idx) VALUES (?,?)'
            //해당하는 해시태그의 idx값과 해당 해시태그를 추가하고자 하는 content의 내역을 생성
            sql_pool.query(sql_content_tag, [content_id, Hash_idx], (err_content_tag, result_content_tag) => {
                if (err_content_tag)
                    res.send("duplication")
                else
                    res.send(result_content_tag)
            })
        })
    })
})

router.post('/tag_search', (req, res) => {
    const search_tag = req.body.Hashtag
    //클라이언트에서 입력된 값들을 받아옴

    const sql_Hashtag = 'SELECT Hash_id FROM Hash WHERE Hashtag = ?'
    //해당하는 해시태그의 idx를 받아오기 위한 쿼리문
    sql_pool.query(sql_Hashtag, [search_tag], (err_tag, rows_tag, result_tag) => {
        if (err_tag)
            console.log(err_tag)
        else {
            const sql_getcontent = `SELECT content.* FROM content_has_hash INNER JOIN content ON 
            content_has_hash.content_idx = content.content_id WHERE content_has_hash.Hash_idx = ?`
            //해당하는 해시태그의 idx를 가진 게시물들을 전부 탐색하는 쿼리문
            sql_pool.query(sql_getcontent, [rows_tag[0].Hash_id], (err_get, rows_get, result_get) => {
                if (err_get)
                    console.log(err_get)
                else
                    res.send(rows_get)
            })
        }
    })
})

router.post('/get_tags', (req, res) => {
    const content_id = req.body.content_id
    //클라이언트에서 입력된 값들을 받아옴

    const sql_gettag = `SELECT Hash.Hashtag FROM content_has_hash INNER JOIN Hash ON 
    content_has_hash.Hash_idx = Hash.Hash_id WHERE content_has_hash.content_idx = ?`
    //해당하는 게시물에 추가된 해시태그들을 모두 받아오는 쿼리문
    sql_pool.query(sql_gettag, [content_id], (err_get, rows_get, result_get) => {
        if (err_get)
            console.log(err_get)
        else
            res.send(rows_get)
    })
})

module.exports = router