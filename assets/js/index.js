import { validate_auth, update_token_interval, logout_user } from "./auth.js";
update_token_interval();


window.onload = function () {
    var spinner = document.getElementById('loader').style;
    var fadeEffect = setInterval(function () {
        spinner.opacity = 0
        spinner.display = "none"
        clearInterval(fadeEffect);
    }, 1000);
    validate_auth("login.html");

    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("username").innerHTML = user.username.toUpperCase();

    const logoutBtn = document.getElementById("logout");
    logoutBtn.addEventListener("click", logout_user);
};
