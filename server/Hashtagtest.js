const sql_pool = require('./mysql')
const search_tag = "수성";

const sql = 'SELECT Hash_id FROM hash WHERE Hashtag = ?'
sql_pool.query(sql, [search_tag], (err, rows, result) => {
  if (err)
    console.log(err)
  else {
    console.log(rows[0].Hash_id)
    const sql2 = 'SELECT content_idx FROM content_has_hash WHERE Hash_idx = ?'
    sql_pool.query(sql2, [rows[0].Hash_id], (err2, result2) => {
      if (err2)
        console.log(err2)
      else
        console.log(result2)
    })
  }
})