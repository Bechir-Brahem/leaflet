const env= process.env
const config = {
   db: { /* don't expose password or any sensitive info, done only for demo */
     host: env.DB_HOST || 'sql3.freemysqlhosting.net',
     user: env.DB_USER || 'sql3434037',
     password: env.DB_PASSWORD || 'tryGseln3j',
     database: env.DB_NAME || 'sql3434037',
   },

  // db: {
    // host: env.DB_HOST || 'localhost',
    // user: env.DB_USER || 'bb',
    // password: env.DB_PASSWORD || 'samirsp6',
    // database: env.DB_NAME || 'tracking',
  // },
  // listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;
