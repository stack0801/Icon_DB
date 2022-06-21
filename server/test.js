const sql_pool = require('./src/mysql')

const id = 'a'
const sql_getcontent = `SELECT * FROM content WHERE user_id = ?`
sql_pool.query(sql_getcontent, [id], (err_get, rows_get, result_get) => {
    if (err_get)
        console.log(err_get)
    else
        console.log(rows_get)
})