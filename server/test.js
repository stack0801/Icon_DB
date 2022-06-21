const sql_pool = require('./src/mysql')
const upload = require('./src/aws_multer').profile_upload

const filename = req.filedirectory

const sql = 'insert into user(profilename) values (?)'
sql_pool.query(sql, [filename], (err, result) => {
    if (err)
        throw err
    else
        res.send("success")
})