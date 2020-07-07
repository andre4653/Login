const Pool = require("pg").Pool     //allows to configure(?)

const pool = new Pool({
    user: "postgres",
    password: "hnpxf8bxf8", 
    host: "localhost",
    port: 5432, 
    database: "jwttutorial"
})

module.exports = pool;