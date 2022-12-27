var BASE_URL = "http://127.0.0.1:8000/";

function validate_auth(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (!token) {
    window.location.href = archivoRedirect;
  }
}

function validate_token(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (token) {
    window.location.href = archivoRedirect;
  }
}

function update_token_interval() {
  let fourMinutes = 1000 * 60 * 15
  let interval = setInterval(() => {
    update_token();
  }, fourMinutes);
  return () => clearInterval(interval);
}

let update_token = async () => {
  console.log("UPDATE TOKEN CALLED");
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));

  let response = await fetch(BASE_URL + "api/jwt/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: authTokens?.refresh }),
  });
  let data = await response.json();
  if (response.status === 200) {
    authTokens.access = data.access
    localStorage.setItem("authTokens", JSON.stringify(authTokens));
  } else {
    logout_user();
  }
};


let logout_user = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
  window.location.replace("./login.html");
};

export { validate_auth, validate_token, update_token_interval, logout_user, BASE_URL };
