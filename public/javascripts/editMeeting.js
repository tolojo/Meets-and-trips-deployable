var user_ID = sessionStorage.getItem('userId');
let concentId = sessionStorage.getItem('concentId');
var latleng="";
window.onload = async function () {



    let data = sessionStorage.getItem('concentId');
    try {
        let html = "";
        let concent = await $.ajax({
            url: "/api/concentracoes/" + data,
            method: "get",
            dataType: "json"
        });
        document.getElementById("nome").value = concent.conc_nome;
        document.getElementById("data").value = concent.conc_data;
        document.getElementById("descricao").value = concent.conc_descricao;

        latleng = ""+concent.conc_coordenadas.x+","+concent.conc_coordenadas.y+"";

        var map = L.map('mapa').setView([38.712954, -9.131880], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var popup = L.popup();
        L.marker([concent.conc_coordenadas.x, concent.conc_coordenadas.y]).addTo(map)
        .bindPopup(concent.conc_nome)
        .openPopup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
            latleng = "" + e.latlng.lat + "," + e.latlng.lng;
            console.log(latleng);
        }

        map.on('click', onMapClick);


    } catch (error) {
        console.log(error);
    }

}

async function Atualizar(){
    let data={
        conc_id:concentId,
        conc_nome:document.getElementById("nome").value,
        conc_descricao:document.getElementById("descricao").value,
        conc_data:document.getElementById("data").value,
        conc_coordenadas : latleng
    }
    try{
    let concent = await $.ajax({
        url: "/api/concentracoes/upConcent",
        method: "put",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json"
    });
    alert("chegou");
    window.location.href = "meetingDetailed.html";
    alert("Meeting atualizado com sucesso");
    
}
catch(err){
    console.log(err);
}
}