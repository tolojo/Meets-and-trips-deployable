var pg = require('pg');

const connectionString = "postgres://qqjwtukuubzaiq:79d5d5d6c2260c226ba05241dda237583846b6163a75f90614eb18c362517e4f@ec2-3-214-121-14.compute-1.amazonaws.com:5432/d6rec0os8s84nc"

const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 20,
    ssl:  {
        require: true, 
        rejectUnauthorized: false
    }
    
})

module.exports = pool;