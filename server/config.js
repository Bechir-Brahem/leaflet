require('dotenv').config()
const env = process.env
const pgConfig = {
    db: {
        connectionString: env.PG_URI,
        ssl: {
            rejectUnauthorized: false
        }
    }
}


module.exports = {
    pgConfig
};
