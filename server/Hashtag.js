const sql_pool = require('./mysql')
const search_tag = "수성";

const sql_Hashtag = 'SELECT Hash_id FROM Hash WHERE Hashtag = ?'
sql_pool.query(sql_Hashtag, [search_tag], (err_tag, rows_tag, result_tag) => {
    if (err_tag)
        console.log(err_tag)
    else {
        const Hash_id = rows_tag[0].Hash_id
        const sql_content_idx = 'SELECT content_idx FROM content_has_hash WHERE Hash_idx = ?'
        sql_pool.query(sql_content_idx, [Hash_id], (err_idx, rows_idx, result_idx) => {
            if (err_idx)
                console.log(err_idx)
            else {
                for (var i = 0; i < rows_idx.length; i++) {
                    const sql_message = 'SELECT message FROM content WHERE content_id = ?'
                    sql_pool.query(sql_message, [rows_idx[i].content_idx], (err_content, result_content) => {
                        if (err_content)
                            console.log(err_content)
                        else {
                            console.log(result_content)
                        }
                    })
                }
            }
        })
    }
})
