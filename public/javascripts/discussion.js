window.onload = async function () {
    try {
        let html = "";
        let discussoes = await $.ajax({
            url: '/api/discussoes',
            method: "get",
            dataType: "json"
        });
        for (let discussao of discussoes) {
            html += `<section onclick='showDisc(${discussao.disc_id})'>
            <h3>${discussao.disc_nome}</h3>
            <h4>${discussao.disc_tags}</h4>
            <h4>${discussao.disc_descricao}</h4>
            <br>
            </section>`;
            document.getElementById("discussoes").innerHTML = html;

        }
    } catch (err) {
        console.log(err);
    }
}

function showDisc(id) {
    sessionStorage.setItem("discId", id);
    window.location = "discussionChat.html";
}