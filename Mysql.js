const mysql = require('mysql')      // mysql 모듈 사용
require('dotenv').config()          // dotenv 모듈 사용

const options = {
    host                : process.env.DB_HOST,      // 데이터베이스 연결을 위한 호스트 이름
    port                : process.env.DB_PORT,      // 데이터베이스 연결을 위한 포트 번호
    user                : process.env.DB_USER,      // 데이터베이스 사용자
    password            : process.env.DB_PASS,      // 위 데이터베이스 사용자의 비밀번호
    database            : process.env.DB_NAME       // 데이터베이스 이름
}

const connection = mysql.createConnection(options)
connection.connect()

module.exports = connection