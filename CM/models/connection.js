var pg = require('pg');

const connectionString = "postgres://postgres:postgres@localhost:5432/mt"

const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 20,
    
})

module.exports = pool;