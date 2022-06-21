const sql_pool = require('./src/mysql')

const content_id = 2
const tag_context = '테스트3'

const sql_searchHash = 'SELECT * FROM Hash WHERE Hashtag = ?'
sql_pool.query(sql_searchHash, [tag_context], (err, rows, result) => {
    if (err)
        console.log(err)
    else {
        const sql_tagdelete = 'DELETE FROM content_has_hash WHERE content_idx = ? AND Hash_idx = ?'
        sql_pool.query(sql_tagdelete, [content_id, rows[0].Hash_id], (err_Hash, result_Hash) => {
            if (err_Hash)
                console.log(err_Hash)
            else
                console.log(result_Hash)
        })
    }
})