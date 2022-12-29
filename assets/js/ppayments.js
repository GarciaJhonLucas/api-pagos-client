import { BASE_URL } from "./auth.js";
import { error_message, warning_message } from './messages.js';

import { validate_auth, update_token_interval, logout_user } from "./auth.js";
update_token_interval();


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


var token = JSON.parse(localStorage.getItem("authTokens"));


document.addEventListener("DOMContentLoaded", function (event) {
    const payment_form = document.getElementById("form");
    all_services();
    payment_form.addEventListener("submit", validation_form);
});


// Obtener los servicios para colocarlos en el menu desplegable
let all_services = async () => {
    let response = await fetch(BASE_URL + "api-services/v2/services/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.access,
        },
    });
    let data = await response.json();
    if (response.status === 200) {
        let { results } = data;
        get_services(results);
    } else {
        console.error("Error en la carga de servicios.");
    }
};


// Cargar los servicvios en el desplegable
function get_services(services_list) {
    const services = document.getElementById("servicio_option");
    services_list.forEach((service) => {
        const option = document.createElement("option");
        option.value = service.id;
        option.text = service.name;
        services.appendChild(option);
    });
}


// Validar el formulario para ingresar los datos
let validation_form = (event) => {
    event.preventDefault();
    let fecha = document.getElementById("fecha_pago_input");
    let servicios = document.getElementById("servicio_option");
    let monto = document.getElementById("monto_pago_input");

    if (fecha.value !== "" && servicios.value !== "-1" && monto.value !== "") {
        let user = JSON.parse(localStorage.getItem("user"));
        let data = {
            user: user.email,
            service: servicios.value,
            monto: monto.value,
            expiration_date: fecha.value,
        };
        add_payment(data);
    }
    else {
        warning_message("Pagos", "Los datos que ingreso no son correctos");
    }
};


// Añadir nuevo pago en el servicio
let add_payment = async (data) => {
    let response = await fetch(BASE_URL + "api-payments/v2/payment/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.access,
        },
        body: JSON.stringify(data),
    });


    if (response.status === 201) {
        Swal.fire(
            "¡Creado!",
            "Los datos se guardaron correctamente",
            "success"
        ).then((result) => {
            if (result.isConfirmed) {
                window.location.replace("../../index.html");
            }
        });
    } else {
        error_message('Pagos', 'Hay errores en el envio de datos')
    }
};
