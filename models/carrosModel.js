var pool = require("./connection");

module.exports.getCarrosUser = async function (id) {
    try {
        let sql = "Select * from carros where car_user_id = $1";
        let result = await pool.query(sql, [id]);
        let carrosUser = result.rows;
        return {
            status: 200,
            result: carrosUser
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.getCarroAtivo = async function (id) {
    try {
        let sql = "Select * from carros where car_id = $1";
        let result = await pool.query(sql, [id]);
        let carrosUser = result.rows[0];
        return {
            status: 200,
            result: carrosUser
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.inscreverCarro = async function (Insc) {
    try {
        let sql = "select * from concentracoescarros inner join carros c on concentracoescarros.conc_car_car_id = c.car_id inner join utilizador u on u.user_id = c.car_user_id where user_id=$1 and conc_car_conc_id=$2"
        let result = await pool.query(sql, [Insc.user_id, Insc.conc_id]);
        let carro = result.rows[0];

        if (Insc.car_id == null) {
            console.log("Não tem um carro registado");
            return {
                status: 400,
                result: Insc
            };
        } else {
            if (carro == undefined) {
                let sql1 = "insert into concentracoescarros(conc_car_conc_id, conc_car_car_id) VALUES ($1,$2)";
                let result1 = await pool.query(sql1, [Insc.conc_id, Insc.car_id]);
                return {
                    status: 200,
                    result: result1
                };
            } else {
                console.log("Ja inscrito");
                return {
                    status: 400,
                    result: result
                };

            }
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }

}

module.exports.getCarrosIncritos = async function (id) {
    try {
        let sql = "Select user_id, user_nome, car_modelo from utilizador inner join carros on user_id = car_user_id inner join concentracoescarros on car_id = conc_car_car_id where conc_car_conc_id = $1";
        let result = await pool.query(sql, [id]);
        let inscritos = result.rows;
        return {
            status: 200,
            result: inscritos
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}