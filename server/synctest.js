const sql_pool = require('./src/mysql')

const content_id = 2
const tag_context = '테스트3'

// //tag insert 동기방식 테스트
// app.post('/tag_insert', async(req, res) => {
//     const sql_Hashtag = 'SELECT * FROM Hash WHERE Hashtag = ?'
//     sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, result_Hash) => {
//         if (result_Hash.length == 0) {
//             const sql_InsertHash = "INSERT INTO Hash(Hashtag) VALUES ('" + tag_context + "')"
//             console.log(sql_InsertHash)
//             sql_pool.query(sql_InsertHash, (err_InsertHash, result_InsertHash) => {
//                 if (err_InsertHash) {
//                     console.log(err_InsertHash)
//                 }
//             })
//         }
//         let Hash_idx
//         await sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, rows_Hash, result_Hash) => {
//             Hash_idx = rows_Hash[0].Hash_id
//         })

//         const sql_content_tag = 'INSERT INTO content_has_hash(content_idx, Hash_idx) VALUES (?,?)'
//         await sql_pool.query(sql_content_tag, [content_id, Hash_idx], (err_content_tag, result_content_tag) => {
//             if (err_content_tag) {
//                 console.log(err_content_tag)
//             }
//             else {
//                 console.log(result_content_tag)
//             }
//         })
//     })
// })

// //mysql.js 동기방식 테스트
// const mysql = require('mysql2')      // mysql 모듈 사용
// const dotenv = require('dotenv') 

// dotenv.config()

// const options = {
//     host                : process.env.DB_HOST,      // 데이터베이스 연결을 위한 호스트 이름
//     port                : process.env.DB_PORT,      // 데이터베이스 연결을 위한 포트 번호
//     user                : process.env.DB_USER,      // 데이터베이스 사용자
//     password            : process.env.DB_PASS,      // 위 데이터베이스 사용자의 비밀번호
//     database            : process.env.DB_NAME,      // 데이터베이스 이름
//     waitForConnections  : true,                     // 풀에 여유 커넥션이 없는 경우 대기 여부
//     connectionLimit     : 10,                       // 최대 커넥션 개수 (기본 값 : 10)
//     queueLimit          : 0                         // queue 에서 대기할 요청의 개수 (Default: 0 - 제한 없음)
// }

// // DB 접속 pool 생성
// const pool = mysql.createPool(options)
// const promise_pool = pool.promise()

// module.exports = promise_pool
