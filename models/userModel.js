var pool = require("./connection");

module.exports.getAllUsers = async function () {
    try {
        let sql = "Select * from utilizador";
        let result = await pool.query(sql);
        let utilizadores = result.rows;
        return {
            status: 200,
            result: utilizadores
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}