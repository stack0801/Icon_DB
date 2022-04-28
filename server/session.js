const sql_pool = require('./mysql.js')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

// session 옵션
const sessionStore_options = {
    clearExpired : true,                // 만료된 세션 자동 확인 및 지우기 여부
    checkExpirationInterval : 900000,   // 만료된 세션이 지워지는 빈도 milliseconds
    expiration: 86400000,               // 유효한 세션의 최대 기간 milliseconds
    createDatabaseTable : true,         // 세션 데이터베이스 테이블 생성 여부, 존재하지 않는 경우
}

const sessionStore = new MySQLStore(sessionStore_options, sql_pool)
//sessionStore.close()  //서버 실행시 close() 할 일이 없음

const session_options = {
    key: 'session_cookie_name',         // key
    secret: 'my_secret',                // secret
    store: sessionStore,                // sessionStore
    resave: false,
    saveUninitialized: false
}

const session_stream = session(session_options)

module.exports = session_stream