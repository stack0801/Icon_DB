const sql_pool = require('./src/mysql')

const user_id = 'a'
 
const sql_userlike = 'SELECT content_idx FROM likefunction WHERE id = ?'
sql_pool.query(sql_userlike, [user_id], (err, rows, result) => {
    if(err)
        console.log(err)
    else {
        for(var i = 0; i < rows.length; i++) {
            const sql_content = 'SELECT message FROM content WHERE content_id = ? '
            sql_pool.query(sql_content, [rows[i].content_idx], (err_content, rows_content, result_content) => {
                if(err_content)
                    console.log(err_content)
                else{
                    console.log(rows_content)
                }
            })
        }
    }
})