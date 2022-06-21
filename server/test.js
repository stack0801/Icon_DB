const sql_pool = require('./src/mysql')

const content_id = 'a'
const sql_getlike = `SELECT content.* FROM likefunction INNER JOIN content ON 
    content.content_id = likefunction.content_idx WHERE likefunction.id = ?`
sql_pool.query(sql_getlike, [content_id], (err_get, rows_get, result_get) => {
    if (err_get)
        console.log(err_get)
    else
        console.log(rows_get)
})