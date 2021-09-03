const mysql = require('mysql2/promise');
const config = require('../config');

//TODO: singleton design pattern
async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    query
}
