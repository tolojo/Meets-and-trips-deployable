var tipo;
var data = sessionStorage.getItem('concentId');
var user_id = sessionStorage.getItem('userId');
var id_inscritos=[];
window.onload = async function () {
    
    try {
        let owner = await $.ajax({
            url: "/api/users/owner/" + data+"/"+ user_id,
            method: "get",
            dataType: "json"
        });
        console.log(owner);


        if (owner == false ) document.getElementById("ePontos").style.display = 'none';
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
<h3>Data: ${concent.conc_data}</h3>
<h3>${concent.user_nome}</h3>
<div id="map"></div>
</section>`;

        tipo = concent.conc_tipo;

document.getElementById("concentracoes").innerHTML = html;

    let html1 = "";
    let inscricoes = await $.ajax({
        url: '/api/carros/inscritos/' + data,
        method: "get",
        dataType: "json"
    });

    console.log(inscricoes);
    for(let inscrito of inscricoes){
        
        id_inscritos.push(inscrito.user_id);
       
        html1 += `<section>
        <h4>${inscrito.user_id} ${inscrito.user_nome}</h4>
        <h4>${inscrito.car_modelo}</h4>
        <br>
        </section>`;
        document.getElementById("inscritos").innerHTML = html1;
        console.log(inscrito);
    }
    console.log(id_inscritos);

                let map = L.map('map').setView([concent.conc_coordenadas.x, concent.conc_coordenadas.y], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

        switch (tipo) {
            case 1:
                L.marker([concent.conc_coordenadas.x, concent.conc_coordenadas.y]).addTo(map)
                    .bindPopup(concent.conc_nome)
                    .openPopup();

                break;

            case 2:
                let roadtrip = await $.ajax({
                    url: "/api/concentracoes/" + data +"/roadtrip",
                    method: "get",
                    dataType: "json"
                });
                console.log(roadtrip);
                L.Routing.control({
                    waypoints: [
                        L.latLng(roadtrip.conc_coordenadas.x, roadtrip.conc_coordenadas.y),
                        L.latLng(roadtrip.rt_coordenadas_final.x,roadtrip.rt_coordenadas_final.y )
                    ]
                }).addTo(map);
                break;
        }

    } catch (err) {
        console.log(err);
    }

}


async function entregarPontos() {
try {
    for(i = 0; i<id_inscritos.length; i++){
        let pontos = await $.ajax({
            url: '/api/users/upPontos/'+data+"/"+id_inscritos[i],
            method: "put",
            dataType: "json"
        });

    } 
    window.location.href= "meeting.html";
} catch (error) {
    console.log(error);
}
}