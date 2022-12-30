import { BASE_URL } from "./auth.js";
import { error_message, warning_message } from './messages.js';
import { validate_auth, update_token_interval, logout_user } from "./auth.js";


// Validar el inicio de sesion y el token de acceso
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


// Obtener los servicios que fueron registrados
function add_services(serviciosList) {
    const servicios = document.getElementById("option_servicio_input");
    serviciosList.forEach((service) => {
        const option = document.createElement("option");
        option.value = service.id;
        option.text = service.name;
        servicios.appendChild(option);
    });
}


let token = JSON.parse(localStorage.getItem("authTokens"));

let get_services = async () => {
    let response = await fetch(BASE_URL + "api-services/v2/services/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        let { results } = data;
        add_services(results);
    } else {
        console.error("Error en la carga de servicios.");
    }
};

get_services();

const selected_element = document.getElementById('option_servicio_input');
selected_element.addEventListener('change', (event) => {
    let id = event.target.value
    get_servicesOne(id);
});

let get_servicesOne = async (id) => {
    let response = await fetch(BASE_URL + "api-services/v2/services/" + id + '/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        document.getElementById('nombre_servicio_input').value = data.name;
        document.getElementById('prefijo_servicio_input').value = data.description;
        document.getElementById('url_servicio_input').value = data.logo;
    } else {
        document.getElementById('nombre_servicio_input').value = '';
        document.getElementById('prefijo_servicio_input').value = '';
        document.getElementById('url_servicio_input').value = '';
        console.error("Error en traer un servicio.");
    }
};

// Put de Servicios
const formEdit = document.getElementById('form');
const servicio = document.getElementById('option_servicio_input');
const nombre = document.getElementById('nombre_servicio_input');
const prefijo = document.getElementById('prefijo_servicio_input');
const urlLogo = document.getElementById('url_servicio_input');


formEdit.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (nombre.value !== "" && prefijo.value !== "" && urlLogo.value !== "") {
        send_data();
    }
};

async function send_data() {
    const data = {
        name: nombre.value,
        description: prefijo.value,
        logo: urlLogo.value,
    }
    let token = JSON.parse(localStorage.getItem("authTokens"));
    let id = servicio.value

    await fetch(BASE_URL + "api-services/v2/services/" + id + '/', {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Actualizado!',
                'Los datos se guardaron correctamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("../../index.html");
                }
            })
        }
        else {
            error_message('Servicios', 'Error en el servicio')
        }
    })
}