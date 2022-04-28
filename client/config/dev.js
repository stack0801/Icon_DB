const mysql = require('mysql')
require('dotenv').config()

const options={
    host                : process.env.DB_HOST,      // 데이터베이스 연결을 위한 호스트 이름
    port                : process.env.DB_PORT,      // 데이터베이스 연결을 위한 포트 번호
    user                : process.env.DB_USER,      // 데이터베이스 사용자
    password            : process.env.DB_PASS,      // 위 데이터베이스 사용자의 비밀번호
    database            : process.env.DB_NAME,      // 데이터베이스 이름
    waitForConnections  : true,                     // 풀에 여유 커넥션이 없는 경우 대기 여부
    connectionLimit     : 10,                       // 최대 커넥션 개수 (기본 값 : 10)
    queueLimit          : 0 
}

const pool=mysql.createPool(options)

module.exports=pool