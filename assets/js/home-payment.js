import { BASE_URL } from "./auth.js";
let token = JSON.parse(localStorage.getItem("authTokens"));
var user = JSON.parse(localStorage.getItem("user"));

let done_services = async (id) => {
    let response = await fetch(BASE_URL + "api-services/v2/services/" + id + '/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        console.error("Error en traer un servicio.");
    }
};

// Metodos de los pagos realizados
let payment_made = async () => {
    let response = await fetch(BASE_URL + "api-payment/v2/payment/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        let { results } = data;
        return results;
    } else {
        console.error("Error en traer los pagos de la bd.");
    }
};

// Obtener los pagos
let pagos = await payment_made();

// validar los pagos
if (pagos.length > 0) {
    let payment_div = document.getElementById('payment_div');

    for (let i = 0; i < pagos.length; i++) {
        if (pagos[i].user === user.email) {
            let service = await done_services(pagos[i].service)
            pagos[i].service = service.name;
            pagos[i].logo = service.logo;
            let div = document.createElement('div')
            div.innerHTML = `<div class="card alert-success">
                                <div class="card-body">
                                    <div class="d-flex flex-row justify-content-between align-items-center">
                                        <div class="servicio">
                                            <img src="${pagos[i].logo}" alt="Service"
                                                class="rounded-circle">
                                            <span class="ms-2">${pagos[i].service}</span>
                                        </div>
                                        <div class="">${pagos[i].fecha_pago}</div>
                                        <div class="">S/. ${pagos[i].monto}</div>
                                    </div>
                                </div>
                            </div>`
            payment_div.appendChild(div);
        }
    }
}

let payment_due = async () => {
    let response = await fetch(BASE_URL + "api-payment/v2/expired-payments/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        let { results } = data;
        return results;
    } else {
        console.error("Error en traer un servicio.");
    }
};


let get_payment = async (id) => {
    let response = await fetch(BASE_URL + "api/v2/pagos/" + id + '/', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.access
        },
    });
    let data = await response.json();

    if (response.status === 200) {
        return data;
    } else {
        console.error("Error en traer un servicio.");
    }
};

