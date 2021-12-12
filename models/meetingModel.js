var pool = require("./connection");
module.exports.getAllConcents = async function () {
    try {
        let sql = "Select * from concentracoes order by conc_id";
        let result = await pool.query(sql);
        let concentracoes = result.rows;
        return {
            status: 200,
            result: concentracoes
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.getConcentByID = async function (id) {
    try {
        let sql = "Select * from concentracoes inner join utilizador u on u.user_id = concentracoes.conc_creator_id where conc_id = $1";
        let result = await pool.query(sql, [id]);
        let concentracoes = result.rows[0];
        return {
            status: 200,
            result: concentracoes
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.getRoadtripById = async function (id) {
    try {
        let sql = "Select * from roadtrip inner join utilizador u on u.user_id = roadtrip.conc_creator_id where conc_id = $1";
        let result = await pool.query(sql, [id]);
        let roadtrips = result.rows[0];
        return {
            status: 200,
            result: roadtrips
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            result: error
        };
    }
}

module.exports.saveConcent = async function (meet) {
    try {
        let sql = "insert into concentracoes (conc_nome, conc_descricao, conc_data, conc_coordenadas, conc_creator_id, conc_tipo,conc_estado,conc_pontos_id) values ($1,$2,$3,$4,$5,$6,$7,$8)";
        let result = await pool.query(sql, [meet.conc_nome, meet.conc_descricao, meet.conc_data, meet.conc_coordenadas, meet.conc_creator_id, meet.conc_tipo,true,1]);
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

module.exports.saveRoadtrip = async function (rt) {
    try {
        let sql = "insert into roadtrip (conc_nome, conc_descricao, conc_data, conc_coordenadas, conc_creator_id,conc_tipo,conc_estado,conc_pontos_id,rt_coordenadas_final) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)";
        let result = await pool.query(sql, [rt.conc_nome, rt.conc_descricao, rt.conc_data, rt.conc_coordenadas,rt.conc_creator_id,rt.conc_tipo,true,2,rt.rt_coordenadas_final]);
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

module.exports.atualizarMeeting = async function (meeting) {
    try {
        let sql = "update concentracoes set conc_nome = $1, conc_descricao = $2, conc_data=$3, conc_coordenadas=$4 where conc_id = $5";
        let result = await pool.query(sql,[meeting.conc_nome, meeting.conc_descricao, meeting.conc_data, meeting.conc_coordenadas, meeting.conc_id]);
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