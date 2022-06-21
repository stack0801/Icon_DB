const sql_pool = require('./src/mysql')

app.post('/tag_search', (req, res) => {
    const search_tag = '김수성'
    const sql_Hashtag = 'SELECT Hash_id FROM Hash WHERE Hashtag = ?'
    sql_pool.query(sql_Hashtag, [search_tag], (err_tag, rows_tag, result_tag) => {
        if (err_tag)
            console.log(err_tag)
        else {
            const sql_getcontent = `SELECT content.* FROM content_has_hash INNER JOIN content ON 
            content_has_hash.content_idx = content.content_id WHERE content_has_hash.Hash_idx = ?`
            sql_pool.query(sql_getcontent, [rows_tag[0].Hash_id], (err_get, rows_get, result_get) => {
                if (err_get)
                    console.log(err_get)
                else
                    console.log(rows_get)
            })
        }
    })
})