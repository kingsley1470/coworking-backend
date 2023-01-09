const { Pool } = require('pg')

let connectionString  =   process.env.DbConnectionString;


const pool = new Pool({connectionString })

module.exports = pool;


