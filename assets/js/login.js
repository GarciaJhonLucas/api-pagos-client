import { validate_token, BASE_URL } from "./auth.js";
import validate from "./validate";
import error_message from './messages.js'

validate_token("index.html");
const login_form = document.getElementById("form");
const email = document.getElementById("email_input");
const password = document.getElementById("password_input");

let user_login = async (event) => {
  event.preventDefault();
  let validated = validate([email.value, password.value]);
  if (validated) {
    let response = await fetch(BASE_URL + "api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      console.log(data);
      let { tokens, data: user } = data
      localStorage.setItem("authTokens", JSON.stringify(tokens));
      localStorage.setItem("user", JSON.stringify(user));
      window.location.replace("./index.html");
    } else {
      error_message('Error en el ingreso...', 'El usuario o la contraseña son incorrectos')
    }
  }
};

login_form.addEventListener("submit", user_login);