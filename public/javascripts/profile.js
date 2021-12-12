var user_id = sessionStorage.getItem('userId');

window.onload = async function () {
    
    try {
        let html = "";
     
        let user = await $.ajax({
            url: '/api/users/'+user_id,
            method: "get",
            dataType: "json"
        });

        let carros = await $.ajax({
            url: '/api/carros/'+user_id,
            method: "get",
            dataType: "json"
        });

        html+= `
        <section>
        <h3>Nome do utilizador: ${user.user_nome}</h3>
        <h4>Pontos: ${user.user_pontos}</h4>
        </section> 
        `;
        for (let carro of carros) {
            html += `<section>
            <h3>Modelo: ${carro.car_modelo}</h3>
            <h4>Potencia: ${carro.car_engine}</h4>
            <button type="button" onclick="selecionar(${carro.car_id})"> Selecionar carro ativo</button>
            </section>`;
            
        }
        document.getElementById("perfil").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}

function selecionar(car_id){
    alert(car_id);
    sessionStorage.setItem("car_id",car_id);

}