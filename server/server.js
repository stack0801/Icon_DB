const express = require('express')
const sql_pool = require('./src/mysql')
const session_stream = require('./src/session')
const upload = require('./src/aws_multer').upload;
const download = require('./src/aws_multer').download;

const app = express()

app.use(express.json())                                 //json 방식으로 통신
app.use(express.urlencoded({ extended: false }))        //post 로 받은 값에서 req.body를 읽을 수 있게함 //근데 솔직히 뭔뜻인지 모르겠음
app.use(session_stream)

//api

app.get('/download/:key', (req, res) => {
    const key = req.params.key
    console.log(key)
    download(req, res, key);
})

app.post('/sign_up', (req, res) => {
    const id = req.body.id
    const password = req.body.pw
    const name = req.body.name

    if (id && password && name) {
        const sql = 'INSERT INTO user VALUES(?, ?, ?)'
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

app.post('/sign_in', (req, res) => {
    const id = req.body.id
    const password = req.body.pw

    if (id && password) {
        const sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        sql_pool.query(sql, [id, password], (err, result) => {
            if (err)
                throw err
            if (result.length > 0) {
                req.session.sign = id
                res.send("success")
            }
            else
                res.send("fail")
        })
    }
    else
        res.send("void")
})

app.post('/sign_out', (req, res) => {
    req.session.destroy(function (err) {
        if (err) throw err;
        console.log('세션 삭제하고 로그아웃됨');
        res.send("success")
    });
})

app.post('/google_sign_in', (req, res) => {
    const id = req.body.id
    const password = req.body.pw
    const name = req.body.name

    if (id && password && name) {
        let sql = 'SELECT * FROM user WHERE id = ? AND password = ?'
        sql_pool.query(sql, [id, password], (err, result) => {
            if (err)
                throw err
            if (result.length > 0) {
                req.session.sign = id
                res.send("success")
            }
            else {
                let sql = 'INSERT INTO user VALUES(?, ?, ?)'
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


app.post('/get_auth', (req, res) => {
    if (req.session.sign)
        res.send(req.session.sign)
    else
        res.send("null")
})

app.post('/get_user', (req, res) => {
    const sql = 'SELECT * FROM user where id = ?'
    sql_pool.query(sql, [req.session.sign], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

app.post('/get_contents', (req, res) => {
    const id = req.body.id
    const count = req.body.count

    const sql = 'SELECT * FROM content order by content_id desc limit ?, ?'
    sql_pool.query(sql, [id, count], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

app.post('/get_content', (req, res) => {
    const id = req.body.id

    const sql = 'SELECT * FROM content where content_id = ?'
    sql_pool.query(sql, [id], (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

app.post('/boardtest', upload.single('img'), (req, res) => {

    console.log(req.filedirectory)

    const id = req.session.sign
    const message = req.body.message
    const filename = req.filedirectory

    const sql = 'insert into content(user_id, message, filename) values (?, ?, ?)'
    sql_pool.query(sql, [id, message, filename], (err, result) => {
        if (err)
            throw err
        else
            res.send("success")
    })
})

app.post('/search', (req, res) => {
    const sql = 'SELECT * FROM content where message LIKE' + " '%" + req.body.searchbox + "%' "
    sql_pool.query(sql, (err, result) => {
        if (err)
            throw err
        else
            res.send(result)
    })
})

app.post('/tag_insert', (req, res) => {
    const content_id = req.body.content_id
    const tag_context = req.body.tag_context

    const sql_Hashtag = 'SELECT * FROM Hash WHERE Hashtag = ?'
    sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, result_Hash) => {
        if (result_Hash.length == 0) {
            const sql_InsertHash = "INSERT INTO Hash(Hashtag) VALUES ('" + tag_context + "')"
            console.log(sql_InsertHash)
            sql_pool.query(sql_InsertHash, (err_InsertHash, result_InsertHash) => {
                if (err_InsertHash) {
                    console.log(err_InsertHash)
                }
            })
        }
        sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, rows_Hash, result_Hash) => {
            const Hash_idx = rows_Hash[0].Hash_id
            const sql_content_tag = 'INSERT INTO content_has_hash(content_idx, Hash_idx) VALUES (?,?)'
            sql_pool.query(sql_content_tag, [content_id, Hash_idx], (err_content_tag, result_content_tag) => {
                if (err_content_tag) {
                    console.log("중복된 값")
                    res.send("duplication")
                }
                else {
                    res.send(result_content_tag)
                }
            })
        })
    })
})

app.post('/tag_search', (req, res) => {
    const search_tag = req.body.search_tag
    const sql_Hashtag = 'SELECT Hash_id FROM Hash WHERE Hashtag = ?'
    sql_pool.query(sql_Hashtag, [search_tag], (err_tag, rows_tag, result_tag) => {
        if (err_tag)
            console.log(err_tag)
        else {
            const Hash_id = rows_tag[0].Hash_id
            const sql_content_idx = 'SELECT content_idx FROM content_has_hash WHERE Hash_idx = ?'
            sql_pool.query(sql_content_idx, [Hash_id], (err_idx, rows_idx, result_idx) => {
                if (err_idx)
                    console.log(err_idx)
                else {
                    for (var i = 0; i < rows_idx.length; i++) {
                        const sql_message = 'SELECT message FROM content WHERE content_id = ?'
                        sql_pool.query(sql_message, [rows_idx[i].content_idx], (err_content, result_content) => {
                            if (err_content)
                                console.log(err_content)
                            else {
                                res.send("success")
                            }
                        })
                    }
                }
            })
        }
    })
})

app.post('/content_delete', (req, res) => {
    const content_id = req.body.content_id
    const sql = 'DELETE FROM content WHERE content_id = ?'
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

app.post('/content_update', (req, res) => {
    const content_id = req.body.content_id
    const content_message = req.body.content_message
    const sql = 'UPDATE content SET message = ? WHERE content_id = ?'
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
        }, (err, data) => {
            if (err) { throw err; }
        });

        upload.single('img')
    }
})

app.post('/setLike', (req, res) => {
    const content_id = req.body.content_id
    const id = req.session.sign
    const liked = req.body.liked
    let sql_likeupdate, sql_liketableupdate

    sql_likeupdate = `UPDATE content SET content.like = content.like${liked ? '-' : '+'}1 WHERE content_id = ?`

    console.log(liked);

    if (liked)
        sql_liketableupdate = 'DELETE FROM likefunction WHERE id = ? AND content_idx = ?'
    else
        sql_liketableupdate = 'INSERT INTO likefunction(id, content_idx) VALUES (?,?)'

    sql_pool.query(sql_likeupdate, [content_id], (err_likeupdate, result_likeupdate) => {
        if (err_likeupdate) {
            console.log(err_likeupdate)
        }
    })

    sql_pool.query(sql_liketableupdate, [id, content_id], (err_liketableupdate, result_liketableupdate) => {
        if (err_liketableupdate)
            console.log(err_liketableupdate)
    })
})

app.post('/check_liked', (req, res) => {
    const content_id = req.body.content_id
    const id = req.session.sign

    const sql_likecheck = 'SELECT * FROM likefunction WHERE id = ? AND content_idx = ?'
    sql_pool.query(sql_likecheck, [id, content_id], (err_likecheck, result_likecheck) => {
        if (result_likecheck.length == 1)
            res.send('Unliked')
    })
})

app.listen(5000)