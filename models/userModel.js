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
    };
}

module.exports.verifyOwnership = async function (id_conc, id_user) {
    try {
        let sql = "select conc_creator_id from concentracoes where conc_id = $1";
        let result = await pool.query(sql, [id_conc]);
        let utilizador = result.rows[0];
        if (utilizador.conc_creator_id == id_user) {
            return {
                status: 200,
                result: true
            };
        } else {
            return {
                status: 200,
                result: false
            };
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    };
}



module.exports.getUserbyId = async function (id) {
    try {
        let sql = "Select * from utilizador where user_id=$1";
        let result = await pool.query(sql, [id]);
        let utilizador = result.rows[0];
        return {
            status: 200,
            result: utilizador
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}


module.exports.login = async function (nome, password) {
    try {
        console.log("chegou");
        let sql = "Select * from utilizador where user_nome = $1 and user_password = $2";
        let result = await pool.query(sql, [nome, password]);
        if (result.rows.length > 0)
            return {
                status: 200,
                result: result.rows[0]
            };
        else return {
            status: 401,
            result: {
                msg: "Nome ou password incorreta"
            }
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.upPontos = async function (conc_id, user_id) {
    try {
        let sql = "select pontos_concentracao, user_pontos from pontos inner join concentracoes c on pontos.pontos_id = c.conc_pontos_id inner join concentracoescarros c2 on c.conc_id = c2.conc_car_conc_id inner join carros c3 on c3.car_id = c2.conc_car_car_id inner join utilizador u on u.user_id = c3.car_user_id where conc_car_conc_id = $1 and car_user_id= $2";
        let result = await pool.query(sql, [conc_id, user_id]);
        pontos = result.rows[0];
        pontosResultado = pontos.pontos_concentracao + pontos.user_pontos;
        let sql1 = "update utilizador set user_pontos = $1 where user_id = $2";
        let result1 = await pool.query(sql1, [pontosResultado, user_id]);

        let sql2 = "update concentracoes set conc_estado = false where conc_id = $1";
        let result2 =   await pool.query(sql2, [conc_id]);

        return {
            status: 200,
            result: result1
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}