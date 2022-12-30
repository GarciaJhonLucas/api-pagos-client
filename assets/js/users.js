import { BASE_URL, admin_validate } from "./auth.js";
import { error_message } from './messages.js'

admin_validate("../../index.html");

var token = JSON.parse(localStorage.getItem("authTokens"));

document.addEventListener("DOMContentLoaded", function (event) {
    const formUsers = document.getElementById("form");
    formUsers.addEventListener("submit", formValidation);
});

let formValidation = (event) => {
    event.preventDefault();
    let email = document.getElementById("email_input");
    let username = document.getElementById("usuario_input");
    let password = document.getElementById("password_input");
   
    if (email.value !== "" && username.value !== "" && password.value !== "") {
        let data = {
            email: email.value,
            username: username.value,
            password: password.value,
        };
        add_user(data);
    }
};

let add_user = async (data) => {
    let response = await fetch(BASE_URL + "users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.access,
        },
        body: JSON.stringify(data),
    });
    let dataResponse = await response.json();
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
        error_message('Usuario', 'Hay errores en la creacion')
    }
};
