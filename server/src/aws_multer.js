//multer 모듈 사용
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const sql_pool = require('./mysql')

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY
})

const s3 = new AWS.S3()

const upload = multer({
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
                    cb(null, filedirectory);
                }
            })
        },
        limits: { fileSize: 1000 * 1000 * 10 }
    })
})

module.exports = upload