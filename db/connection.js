const mysql = require('mysql')

const connectionPool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database:'music',
    multipleStatements: true
})

exports.cp = connectionPool