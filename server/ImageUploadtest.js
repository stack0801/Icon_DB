import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'

AWS.config.update({
    region : 'us-east-1',
    accessKeyID : process.env.AWS_ACCESSKEY,
    secretAccessKey : process.env.AWS_SECRETACCESSKEY
})

const s3 = new AWS.S3()

const allowedExtensions = ['.png', '.jpg']

const imageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'webservicegraduationproject',
        key: (req, file, callback) => {

        },
        acl: 'public-read-write'
    }),
})