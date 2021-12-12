var pool = require("./connection");
var disc_creator_id = 1;
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

/*For discussion details*/
module.exports.getDiscussaoByID = async function (id) {
    try {
        let sql = "Select * from discussoes where disc_id = $1";
        let result = await pool.query(sql, [id]);
        let discussoes = result.rows[0];
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

//Criar discussão
module.exports.saveDisc = async function (disc) {
    try {
        let sql = "insert into discussoes (disc_nome, disc_descricao, disc_tags, disc_creator_id) values ($1,$2,$3,$4)";
        let result = await pool.query(sql, [disc.disc_nome, disc.disc_descricao, disc.disc_tags, disc_creator_id]);
        return {
            status: 200,
            result: result
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.showMessage = async function (disc_id){
    try{
        let sql = "select user_nome, disc_user_mensagem from discussoesutilizador inner join utilizador on disc_user_user_id = user_id where disc_user_disc_id = $1 order by disc_user_id";
        let result = await pool.query(sql, [disc_id]);
        let discussoes = result.rows;
        return{
            status: 200,
            result: discussoes
        }
    }catch(err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.chatMessage = async function (disc) {
    try {
        let sql = "insert into discussoesutilizador (disc_user_user_id, disc_user_disc_id, disc_user_mensagem) values ($1, $2, $3)";
        let result = await pool.query(sql, [disc.disc_user_user_id, disc.disc_user_disc_id, disc.disc_user_mensagem]);
        return {
            status: 200,
            result: result
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}