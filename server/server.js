const express = require('express')                      //express 모듈 사용
const app = express()
var path = require('path')
const sql_pool = require('./mysql')                     //mysql.js 파일 로드
const session_stream = require('./session')

app.use(express.static('icons/'))                       //폴더를 클라이언트가 요청가능 (static)
app.use(express.static('Front/'))                       //react 를 사용함으로서 추후에 삭제 가능

app.use(express.json())                                 //json 방식으로 통신
app.use(express.urlencoded({ extended: false }))           //post 로 받은 값에서 req.body를 읽을 수 있게함 //근데 솔직히 뭔뜻인지 모르겠음
app.use(session_stream)

//html

app.get('/', (req, res) => {                            // '/'주소로 요청받았을때
    res.sendFile(__dirname + '/Front/html/main.html')   // __dirname + '/Front/html/main.html' 주소의 파일을 넘겨줌
})

app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + '/Front/html/sign_up.html')
})

app.get('/sign_in', (req, res) => {
    res.sendFile(__dirname + '/Front/html/sign_in.html')
})

app.get('/boardtest', (req, res) => {
    if (req.session.sign)
        res.sendFile(__dirname + '/Front/html/boardtest.html')
    else
        res.redirect('/')
})

//api

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

app.get('/content/:id', (req, res) => {
    res.sendFile(__dirname + '/Front/html/content.html')
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

//multer 모듈 사용
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY
})

var s3 = new AWS.S3()

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'webservicegraduationproject',
        acl: 'public-read-write',
        key: function (req, file, cb) {
            const sql = 'SELECT content_id FROM content ORDER BY content_id DESC LIMIT 1'
            sql_pool.query(sql, (err, rows, result) => {
                if (err)
                    console.log(err)
                else {
                    const filedirectory = 'img/' + (rows[0].content_id + 1) + '.' + file.originalname.split('.').pop()
                    console.log(filedirectory)
                    cb(null, filedirectory);
                }
            })
        },
        limits: { fileSize: 1000 * 1000 * 10 }
    })
})

// const s3 = new AWS.S3({
//     accessKeyID : process.env.AWS_ACCESSKEY,
//     secretAccessKey : process.env.AWS_SECRETACCESSKEY,
//     region : 'us-east-1'
// });

// const allowedExtensions = ['.png', '.jpg', '.svg']

// const imageUploader = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'webservicegraduationproject',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         key: (req, file, callback) => {
//             callback(null, `${file.originalname}`)
//         },
//         acl: 'public-read-write'
//     }),
// })

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'icons/');
//     },
//     filename: (req, file, cb) => {
//         const sql = 'select * from content order by content_id desc limit 1'
//         sql_pool.query(sql, (err, results) => {
//             if (err)
//                 console.log(err);
//             else
//                 cb(null, "" + (results[0].content_id + 1) + path.extname(file.originalname));    //강제 jpg 형변환 추후 고려
//         })
//     }
// })
// const upload = multer({storage: storage })
// //

app.post('/boardtest', upload.single('img'), (req, res) => {

    console.log(req.body)

    const id = req.session.sign
    const message = req.body.message

    const sql = 'insert into content(user_id, message) values (?,?)'
    sql_pool.query(sql, [id, message], (err, result) => {
        if (err)
            throw err
    })
    res.send("success")
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

    s3.deleteObject({
        Bucket: 'webservicegraduationproject',
        Key: 'img/' + content_id + '.png'
    }, (err, data) => {
        if (err) { throw err; }
    });
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

app.listen(5000)