const sql_pool = require('./mysql')

const content_id = 5
const id = 'a'

const sql_likeinsert = 'INSERT INTO likefunction(id, content_idx) VALUES (?,?)'
sql_pool.query(sql_likeinsert, [id, content_id], (err_likeinsert, result_likeinsert) => {
    if (err_likeinsert) {
        console.log(err_likeinsert)
        console.log("이미 좋아요를 누르셨습니다!")
    }
    else {
        const sql_likeupdate = 'UPDATE content SET content.like = content.like+1 WHERE content_id = ?'
        sql_pool.query(sql_likeupdate, [content_id], (err_likeupdate, result_likeupdate) => {
            if (err_likeupdate) {
                console.log(err_likeupdate)
            }
        })
    }
})