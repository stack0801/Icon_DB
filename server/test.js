const sql_pool = require('./src/mysql')

const content_id = req.body.content_id
const tag_context = req.body.tag_context

const sql_Hashtag = 'SELECT * FROM Hash WHERE Hashtag = ?'
sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, result_Hash) => {
    if (result_Hash.length == 0) {
        const sql_InsertHash = "INSERT INTO Hash(Hashtag) VALUES ('" + tag_context + "')"
        sql_pool.query(sql_InsertHash, (err_InsertHash, result_InsertHash) => {
            if (err_InsertHash) {
                console.log(err_InsertHash)
            }
        })
    }
    sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, rows_Hash, result_Hash) => {
        const Hash_idx = rows_Hash[0].Hash_id
        const sql_content_tag = 'INSERT INTO content_has_hash(content_idx, Hash_idx) VALUES (?,?)'
        sql_pool.query(sql_content_tag, [content_id, Hash_idx], (err_content_tag, result_content_tag) => {
            if (err_content_tag) {
                res.send("duplication")
            }
            else {
                res.send(result_content_tag)
            }
        })
    })
})