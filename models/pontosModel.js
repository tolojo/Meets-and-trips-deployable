module.exports.getPontos = async function (id) {
    try {
        let sql = "select pontos_concentracao from pontos where pontos_id = $1";
        let result = await pool.query(sql, id);
        return{status: 200, result:result}
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}