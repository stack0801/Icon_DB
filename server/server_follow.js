const express = require('express')
const router = express.Router()
const sql_pool = require('./src/mysql')
//express 모듈을 불러옴
//express 모듈의 라우터 기능을 불러옴
//mysql.js에 있는 sql기능을 가져옴

router.post('/check_followed', (req, res) => {
    const id = req.session.sign
    const Follower = req.body.id 
    //클라이언트에서 입력된 값들을 받아옴

    const sql_Followcheck = 'SELECT * FROM Follow WHERE Following = ? AND Follower = ?'
    //서로가 팔로우 되어있는지 확인하기 위한 쿼리문
    sql_pool.query(sql_Followcheck, [Follower, id], (err_Followcheck, result_Followcheck) => {
        if (result_Followcheck.length > 0)
            res.send('followed')
        else
            res.send('unfollowed')
    })
})

router.post('/setFollow', (req, res) => {
    const id = req.session.sign
    const Follower = req.body.id
    //클라이언트에서 입력된 값들을 받아옴

    const sql_Followcheck = 'SELECT * FROM Follow WHERE Following = ? AND Follower = ?'
    //서로가 팔로우 되어있는지 확인하기 위한 쿼리문
    sql_pool.query(sql_Followcheck, [Follower, id], (err_Followcheck, result_Followcheck) => {
        let sql_follow
        let followed = result_Followcheck.length

        if (followed > 0)
            sql_follow = 'DELETE FROM Follow WHERE Following = ? AND Follower = ?'
            //팔로우가 되어있으면 해당 팔로우 내역을 제거
        else
            sql_follow = 'INSERT INTO Follow (Following, Follower) VALUES(?,?)'
            //팔로우가 되어 있지않으면 서로간의 팔로우 내용을 추가

        sql_pool.query(sql_follow, [Follower, id], (err, result) => {
            if (err)
                console.log(err)
            else 
                res.send(!followed) 
        })
    })
})

router.post('/get_Following', (req, res) => {
    const id = req.body.id
    //클라이언트에서 입력된 값들을 받아옴

    const sql_get = `SELECT user.* FROM Follow INNER JOIN user ON 
    user.id = Follow.Following WHERE Follower = ?`
    //현재 로그인 되어있는 계정에서 팔로잉 하고 있는 계정 목록을 불러오기 위한 쿼리문
    sql_pool.query(sql_get, [id], (err, rows, result)=> {
        if(err)
            console.log(err)
        else
            res.send(rows)
    })
})

router.post('/get_Follower', (req, res) => {
    const id = req.body.id
    //클라이언트에서 입력된 값들을 받아옴

    const sql_get = `SELECT user.* FROM Follow INNER JOIN user ON 
    user.id = Follow.Follower WHERE Following = ?`
    //현재 로그인 되어있는 계정을 팔로우 하고 있는 계정 목록을 불러오기 위한 쿼리문
    sql_pool.query(sql_get, [id], (err, rows, result)=> {
        if(err)
            console.log(err)
        else
            res.send(rows)
    })
})

module.exports = router