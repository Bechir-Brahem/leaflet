const env = process.env;
let chooseDB = 2;
const config = { db: {} };
if (chooseDB === 1) {
    config.db = {
        host: env.DB_HOST || "sql3.freemysqlhosting.net",
        user: env.DB_USER || "sql3434037",
        password: env.DB_PASSWORD || "tryGseln3j",
        database: env.DB_NAME || "sql3434037",
    };
} else if (chooseDB === 2) {
    config.db = {
        host: env.DB_HOST || "localhost",
        user: env.DB_USER || "bb",
        password: env.DB_PASSWORD || "",
        database: env.DB_NAME || "tracking",
    };
}

module.exports = config;
