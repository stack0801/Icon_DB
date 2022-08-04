const express = require('express')
const router = express.Router()
const sql_pool = require('./src/mysql')
//express 모듈을 불러옴
//express 모듈의 라우터 기능을 불러옴
//mysql.js에 있는 sql기능을 가져옴

router.post('/check_liked', (req, res) => {
    const content_id = req.body.content_id
    const id = req.session.sign
    //클라이언트에서 입력된 값들을 받아옴

    const sql_likecheck = 'SELECT * FROM likefunction WHERE id = ? AND content_idx = ?'
    //현재 로그인된 계정이 들어간 content의 좋아요 유무를 확인하기 위한 쿼리문
    sql_pool.query(sql_likecheck, [id, content_id], (err_likecheck, result_likecheck) => {
        if (result_likecheck.length > 0)
            res.send('liked')
        else
            res.send('unliked')
    })
})

router.post('/setLike', (req, res) => {
    const content_id = req.body.content_id
    const id = req.session.sign
    //클라이언트에서 입력된 값들을 받아옴

    const sql_likecheck = 'SELECT * FROM likefunction WHERE id = ? AND content_idx = ?'
    //현재 로그인된 계정이 들어간 content의 좋아요 유무를 확인하기 위한 쿼리문
    sql_pool.query(sql_likecheck, [id, content_id], (err_likecheck, result_likecheck) => {
        let sql_liketableupdate
        let sql_likeupdate
        let like = result_likecheck.length > 0

        if (like) { //해당 게시글에 좋아요가 되어 있을 때
            sql_likeupdate = `UPDATE content SET content.like = content.like-1 WHERE content_id = ?`
            sql_liketableupdate = 'DELETE FROM likefunction WHERE id = ? AND content_idx = ?'
            //해당 게시물의 좋아요 갯수를 낮추는 쿼리문
            //해당 게시물에 좋아요 한 내역을 제거하는 쿼리문
        }
        else { //해당 게시글에 좋아요가 되어 있지 않을 때
            sql_likeupdate = `UPDATE content SET content.like = content.like+1 WHERE content_id = ?`
            sql_liketableupdate = 'INSERT INTO likefunction(id, content_idx) VALUES (?,?)'
            //해당 게시물의 좋아요 갯수를 올리는 쿼리문
            //해당 게시물에 좋아요 내역을 추가하는 쿼리문
        }

        sql_pool.query(sql_likeupdate, [content_id], (err_likeupdate, result_likeupdate) => {
            if (err_likeupdate)
                console.log(err_likeupdate)
            else {
                sql_pool.query(sql_liketableupdate, [id, content_id], (err_liketableupdate, result_liketableupdate) => {
                    if (err_liketableupdate)
                        console.log(err_liketableupdate)
                    else
                        res.send(!like)
                })
            }
        })
    })
})

router.post('/get_userlike', (req, res) => {
    const id = req.body.id
    //클라이언트에서 입력된 값들을 받아옴

    const sql_getlike = `SELECT content.* FROM likefunction INNER JOIN content ON 
    content.content_id = likefunction.content_idx WHERE likefunction.id = ?`
    //현재 로그인되어 있는 계정에서 좋아요 누른 모든 게시물들을 받아오는 쿼리문
    sql_pool.query(sql_getlike, [id], (err_get, rows_get, result_get) => {
        if (err_get)
            console.log(err_get)
        else
            res.send(rows_get)
    })
})

module.exports = router