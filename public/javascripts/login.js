async function logIn() {

    try {
        let data = {
        nome : document.getElementById('nome').value,
        password : document.getElementById('password').value
    };

    let user = await $.ajax({
        url: '/api/users/login',
        method: 'post',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
    sessionStorage.setItem("userId",user.user_id);
    alert(user.user_id);
    window.location.href = "home.html";
    } catch (err) {
        document.getElementById("msg").innerText = err.responseJSON.msg;
    }
}