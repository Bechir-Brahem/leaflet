const db = require('./db');
const config = require('../config');

//TODO: paginator
async function getMultiple(){
    const rows = await db.query(
       `select ID,NA,TM,LT,LG,DA,TI from trackingData ORDER BY ID DESC LIMIT 1000;`
    );

    return emptyOrRows(rows);
}
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
    getMultiple
}
