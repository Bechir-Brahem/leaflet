const db = require('./db');

//TODO: paginator
async function getMultiple() {
    const rows = await db.query('(select ID,NA,TM,LT,LG,DA,TI from trackingData ORDER BY DA DESC,TI DESC)');

    return emptyOrRows(rows);
}
async function getLimited(l) {
    const rows = await db.query('(select ID,NA,TM,LT,LG,DA,TI from trackingData ORDER BY DA DESC,TI DESC LIMIT '+l+')');

    return emptyOrRows(rows);
}

function sortByDate(boats) {
    boats.sort((a, b) => {
        if (a.DA - b.DA === 0) {
            return a.TI - b.TI;
        }
        return a.DA - b.DA;
    })
}


function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getMultiple,
    getLimited,
}
