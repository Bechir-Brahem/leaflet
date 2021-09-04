const env= process.env
const config = {
   db: { /* don't expose password or any sensitive info, done only for demo */
     host: env.DB_HOST || 'sql3.freemysqlhosting.net',
     user: env.DB_USER || 'sql3434037',
     password: env.DB_PASSWORD || 'tryGseln3j',
     database: env.DB_NAME || 'sql3434037',
   },

  // listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;
