var convidadoId;

async function RegistarDisc() {

    let info = {
        disc_nome: document.getElementById("nome").value,
        disc_tags: document.getElementById("tags").value,
        disc_descricao: document.getElementById("descricao").value,
        disc_creator_id:sessionStorage.getItem('userId')
    };
    try {
        let res = await $.ajax({
            url: `/api/discussoes`,
            method: "post",
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json"
        })
        alert("Discussão criada com sucesso");
        window.location.href = "discussions.html";
    } catch (err) {
        console.log(err);
    }
}

async function Convidar(){
    let convidado = document.getElementById("nomeUserC").value

    try {
        let users = await $.ajax({
            url: '/api/utilizadores/nome',
            method: "get",
            dataType: "json"
        });
        for(let user of users){
            if(user.user_nome == convidado){
                alert("Utilizador existe");
                convidadoId = nome.user_id;
            }
        }
    } catch (err) {
        console.log(err);
    }
}