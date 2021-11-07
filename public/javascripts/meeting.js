window.onload = async function () {
    try {
        let html = "";
        let concentracoes = await $.ajax({
            url: '/api/concentracoes',
            method: "get",
            dataType: "json"
        });
        for (let concent of concentracoes) {
            console.log(concent.conc_coordenadas.x, concent.conc_coordenadas.y);
            html += `<section onclick='showConcent(${concent.conc_id})'>
    <h3>${concent.conc_nome}</h3>
    <p>${concent.conc_descricao}</p>
    </section>`;
            document.getElementById("concentracoes").innerHTML = html;

        }
    } catch (err) {
        console.log(err);
    }
}

function showConcent(id) {
    sessionStorage.setItem("concentId", id);
    window.location = "meetingDetailed.html";

}