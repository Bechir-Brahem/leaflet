
const {Pool} = require("pg");
const {pgConfig} = require("../config");



async function query(sql,params){

    const pool = new Pool(pgConfig.db)
    const result = await pool.query(sql,params);
    return result.rows;
}

module.exports = {
    query
}