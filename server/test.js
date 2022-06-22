const sql_pool = require('./src/mysql')

const content_id = 3
const tag_context = 'Finaltest'

const sql_InsertHash = "INSERT INTO Hash(Hashtag) VALUES ('" + tag_context + "')"
sql_pool.query(sql_InsertHash, (err_InsertHash, result_InsertHash) => {
    const sql_Hashtag = 'SELECT * FROM Hash WHERE Hashtag = ?'
    sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, rows_Hash, result_Hash) => {
        const Hash_idx = rows_Hash[0].Hash_id
        const sql_content_tag = 'INSERT INTO content_has_hash(content_idx, Hash_idx) VALUES (?,?)'
        sql_pool.query(sql_content_tag, [content_id, Hash_idx], (err_content_tag, result_content_tag) => {
            if (err_content_tag)
                console.log("duplication")
            else
                console.log(result_content_tag)
        })
    })
})