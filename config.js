const env= process.env
const config = {
    db: {
    host: env.DB_HOST || 'sql3.freemysqlhosting.net',
    user: env.DB_USER || 'sql3434037',
    password: env.DB_PASSWORD || 'tryGseln3j',
    database: env.DB_NAME || 'sql3434037',
    },
};


module.exports = config;

