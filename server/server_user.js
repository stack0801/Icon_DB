const express = require('express')
const router = express.Router()
const sql_pool = require('./src/mysql')
const profile_upload = require('./src/aws_multer').profile_upload
//express 모듈을 불러옴
//express 모듈의 라우터 기능을 불러옴
//mysql.js에 있는 sql기능을 가져옴
//aws에 프로필 사진을 업로드할 수 있는 모듈을 불러옴

router.post('/get_profile', (req, res) => {
    const user = req.body.user
    //현재 로그인되어 있는 아이디를 받아옴

    const sql = 'SELECT * FROM user where id = ?'
    //현재 로그인되어 있는 정보를 모두 받아오기 위한 쿼리문
    sql_pool.query(sql, [user], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

router.post('/update_profile_img', profile_upload.single('img'), (req, res) => {
    const filename = req.filedirectory
    const id = req.session.sign
    //클라이언트에서 전달된 값들을 받아옴

    const sql = 'UPDATE user SET profilename = ? WHERE id = ?'
    //해당하는 아이디의 프로필 이름을 설정하고 프로필 이미지를 aws에 업로드
    sql_pool.query(sql, [filename, id], (err, result) => {
        if (err)
            throw err
        else
            res.send("success")
    })
})

router.post('/update_profile_nickname', (req, res) => {
    const nickname = req.body.nickname
    const id = req.session.sign
    //클라이언트에서 전달된 값들을 받아옴

    const sql = 'UPDATE user SET nickname = ? WHERE id = ?'
    //로그인되어 있는 아이디의 닉네임 정보를 변경
    sql_pool.query(sql, [nickname, id], (err, result) => {
        if (err)
            throw err
        else
            res.send("success")
    })
})

router.post('/sign_up', (req, res) => {
    const id = req.body.id
    const password = req.body.pw
    const name = req.body.name
    //클라이언트에서 전달된 값들을 받아옴

    if (id && password && name) {
        const sql = 'INSERT INTO user(id, password, nickname) VALUES(?, ?, ?)'
        //id, 비밀번호, 닉네임을 다음과 같이 회원정보를 DB에 저장
        sql_pool.query(sql, [id, password, name], (err, result) => {
            if (err)
                res.send("fail")
            else
                res.send("success")
        })
    }
    else
        res.send("void")
})

router.post('/sign_in', (req, res) => {
    const id = req.body.id
    const password = req.body.pw
    //클라이언트에서 전달된 값들을 받아옴

    if (id && password) {
        const sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        //해당하는 아이디와 비밀번호가 있는지 확인
        sql_pool.query(sql, [id, password], (err, result) => {
            if (err)
                throw err
            if (result.length > 0) {
                req.session.sign = id
                res.send("success")
                //정보가 있다면 로그인
            }
            else
                res.send("fail")
        })
    }
    else
        res.send("void")
})

router.post('/sign_out', (req, res) => {
    req.session.destroy(function (err) {
        if (err)
            throw err;
        else
            res.send("success");
    });
    //로그아웃을 하게되면 현재 로그인 되어 있는 세션정보를 제거
})

router.post('/google_sign_in', (req, res) => {
    const id = req.body.id
    const password = req.body.pw
    const name = req.body.name
    //클라이언트에서 입력된 값들을 받아옴

    if (id && password && name) {
        let sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        //다음과 같은 정보의 계정이 있는지 확인
        sql_pool.query(sql, [id, password], (err, result) => {
            if (err)
                throw err
            if (result.length > 0) {
                req.session.sign = id
                res.send("success")
            }
            else {
                let sql = 'INSERT INTO user VALUES(?, ?, ?)'
                //없다면 회원가입 후 로그인
                sql_pool.query(sql, [id, password, name], (err, result) => {
                    if (err)
                        res.send("fail")
                    else {
                        req.session.sign = id
                        res.send("success")
                    }
                })
            }
        })
    }
    else
        res.send("void")
})


router.post('/get_auth', (req, res) => {
    if (req.session.sign)
        res.send(req.session.sign)
    else
        res.send("null")
    //로그인 정보를 세션으로 부터 받아옴
})

router.post('/get_user', (req, res) => {
    const sql = 'SELECT * FROM user where id = ?'
    //현재 로그인 되어있는 아이디의 모든 정보를 받아오는 쿼리문
    sql_pool.query(sql, [req.session.sign], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

module.exports = router