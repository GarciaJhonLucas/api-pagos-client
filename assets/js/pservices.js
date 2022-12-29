import { validate_auth, update_token_interval, logout_user } from "./auth.js";
import { error_message, warning_message } from './messages.js';
update_token_interval();
import { BASE_URL } from "./auth.js";

window.onload = function () {
    var spinner = document.getElementById('loader').style;
    var fadeEffect = setInterval(function () {
        spinner.opacity = 0
        spinner.display = "none"
        clearInterval(fadeEffect);
    }, 1000);
    validate_auth("../../login.html");

    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("username").innerHTML = user.username.toUpperCase();

    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", logout_user);
};


// Obtener los datos del los componentes
const nombre = document.getElementById('nombre_servicio_input');
const prefijo = document.getElementById('prefijo_servicio_input');
const urlLogo = document.getElementById('url_servicio_input');


formAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    validation_form();
});


let validation_form = () => {
    if (nombre.value !== "" && prefijo.value !== "" && urlLogo.value !== "") {
        acceptData();
    }
};

async function acceptData() {
    const data = {
        name: nombre.value,
        description: prefijo.value,
        logo: urlLogo.value,
    }
    let token = JSON.parse(localStorage.getItem("authTokens"));
    console.log(token.access);
    await fetch(BASE_URL + "api-services/v2/services/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("../../index.html");
                }
            })
        }
        else {
            error_message('Servicios', 'Ocurrio un error indesperado')
        }
    })
}