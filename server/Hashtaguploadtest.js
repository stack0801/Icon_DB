const sql_pool = require('./mysql')

const content_id = 5
const tag_context = '테스트2'

const sql_Hashtag = 'SELECT * FROM Hash WHERE Hashtag = ?'
sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, result_Hash) => {
    if (result_Hash.length == 0) {
        const sql_InsertHash = "INSERT INTO Hash(Hashtag) VALUES ('" + tag_context + "')"
        console.log(sql_InsertHash)
        sql_pool.query(sql_InsertHash, (err_InsertHash, result_InsertHash) => {
            if (err_InsertHash) {
                console.log(err_InsertHash)
            }
            sql_pool.query(sql_Hashtag, [tag_context], (err_Hash, rows_Hash, result_Hash) => {
                const Hash_idx = rows_Hash[0].Hash_id
                const sql_content_tag = 'INSERT INTO content_has_hash(content_idx, Hash_idx) VALUES (?,?)'
                sql_pool.query(sql_content_tag, [content_id, Hash_idx], (err_content_tag, result_content_tag) => {
                    if (err_content_tag) {
                        console.log("중복된 값")
                    }
                    else {
                        console.log(result_content_tag)
                    }
                })
            })
        })
    }
})