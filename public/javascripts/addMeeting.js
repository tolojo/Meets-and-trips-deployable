var latleng;
var latlengF

var user_ID = sessionStorage.getItem('userId');
window.onload = async function () {
    document.getElementById("nome").style.display = 'none';
    document.getElementById("data").style.display = 'none';
    document.getElementById("descricao").style.display = 'none';
    document.getElementById("mapa").style.display = 'none';
    document.getElementById("mapaFL").style.display = 'none';
    document.getElementById("mapaF").style.display = 'none';
    document.getElementById("mapaFL").style.display = 'none';
    document.getElementById("mapaF").style.display = 'none';
    try {

        document.getElementById("mapaF").innerHTML = "";
        var map = L.map('mapa').setView([38.712954, -9.131880], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
            latleng = "" + e.latlng.lat + "," + e.latlng.lng;
            console.log(latleng);
        }

        map.on('click', onMapClick);
        var mapaF = L.map('mapaF').setView([38.712954, -9.131880], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapaF);

        var popup1 = L.popup();

        function onMapClick1(e1) {
            popup1
                .setLatLng(e1.latlng)
                .setContent("You clicked the map at " + e1.latlng.toString())
                .openOn(mapaF);
            latlengF = "" + e1.latlng.lat + "," + e1.latlng.lng;
            console.log(latlengF);
        }

        mapaF.on('click', onMapClick1);

    } catch (err) {
        console.log(err);
    }
}

async function roadtrip() {
    tipo = document.getElementById("tipoEvent").value;

    switch (tipo) {
        case '1':
            document.getElementById("nome").style.display = 'block';
            document.getElementById("data").style.display = 'block';
            document.getElementById("descricao").style.display = 'block';
            document.getElementById("mapa").style.display = 'block';
            document.getElementById("mapaFL").style.display = 'none';
            document.getElementById("mapaF").style.display = 'none';
            break;


        case '2':
            document.getElementById("nome").style.display = 'block';
            document.getElementById("data").style.display = 'block';
            document.getElementById("descricao").style.display = 'block';
            document.getElementById("mapa").style.display = 'block';
            document.getElementById("mapaFL").style.display = 'block';
            document.getElementById("mapaF").style.display = 'block';
            break;
    }
    console.log(tipo);
}

async function Registar() {
    switch (tipo) {
        case '1':
            let info = {
                conc_nome: document.getElementById("nome").value,
                conc_descricao: document.getElementById("descricao").value,
                conc_data: document.getElementById("data").value,
                conc_tipo: tipo,
                conc_pontos_id: 1,
                conc_coordenadas: latleng,
                conc_creator_id: user_ID,
            };
            try {
                let res = await $.ajax({
                    url: `/api/concentracoes/regConc`,
                    method: "post",
                    data: JSON.stringify(info),
                    dataType: "json",
                    contentType: "application/json"
                })
                alert("Evento criado com sucesso");
                window.location.href = "meeting.html";
            } catch (err) {
                alert(err);
            }
            break;

        case '2':
            alert("entrou no caso 2");
            try {
                let data = {
                    conc_nome: document.getElementById("nome").value,
                    conc_descricao: document.getElementById("descricao").value,
                    conc_data: document.getElementById("data").value,
                    conc_coordenadas: latleng,
                    conc_creator_id: user_ID,
                    conc_pontos_id: 2,
                    conc_tipo: 2,
                    rt_coordenadas_final: latlengF
                };
                console.log(data);
                let res = await $.ajax({
                    url: `/api/concentracoes/regRoadtrip`,
                    method: "post",
                    data: JSON.stringify(data),
                    dataType: "json",
                    contentType: "application/json"
                });
                alert("Roadtrip criado com sucesso");

                window.location.href = "meeting.html";

            } catch (err) {
                console.log(err);
            }

            break;
    }

}