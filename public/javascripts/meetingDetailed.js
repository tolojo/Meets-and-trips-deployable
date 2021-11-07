window.onload = async function () {
    let data = sessionStorage.getItem('concentId');
    try {
        let html = "";
        let concent = await $.ajax({
            url: "/api/concentracoes/" + data,
            method: "get",
            dataType: "json"
        });
        console.log(concent);
        
        html += `<section>
    <h3>${concent.conc_nome}</h3>
    <h3>${concent.conc_descricao}</h3>
    <h3>${concent.conc_creator_id}</h3>
    <div id="map"></div>
    </section>`;
        document.getElementById("concentracoes").innerHTML = html;

        var map = L.map('map').setView([concent.conc_coordenadas.x, concent.conc_coordenadas.y], 13);


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([concent.conc_coordenadas.x, concent.conc_coordenadas.y]).addTo(map)
            .bindPopup(concent.conc_nome)
            .openPopup();


    } catch (err) {
        console.log(err);
    }
}
