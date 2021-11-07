window.onload = async function () {
    try {
        let html = "";
        let discussoes = await $.ajax({
            url: '/api/discussoes',
            method: "get",
            dataType: "json"
        });
        for (let discussao of discussoes) {
           console.log(discussao.disc_nome);
            html += `<section onclick='showConcent(${discussao.disc_id})'>
    <h3>${discussao.disc_nome}</h3>
    <h4>${discussao.disc_tags}</h4>
    <h4>${discussao.disc_descricao}</h4>
    <p></p>
    </section>`;
            document.getElementById("discussoes").innerHTML = html;

        }
    } catch (err) {
        console.log(err);
    }
}