var pool = require("./connection");
var conc_creator_id = 1;
module.exports.getAllDiscussions = async function () {
    try {
        let sql = "Select * from discussoes";
        let result = await pool.query(sql);
        let discussoes = result.rows;
        return {
            status: 200,
            result: discussoes
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}
