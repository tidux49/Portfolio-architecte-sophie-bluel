const formul = document.querySelector("#formulaire");

function getCredentials(event) {
    const credentials = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=login]").value,
    };

    return JSON.stringify(credentials);
}

async function fetchLogin(credentialsJson) {
    return fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: credentialsJson,
        headers: { "Content-Type": "application/json" }
    });
}

async function login(event) {
   
    const credentialsJson = getCredentials(event);

    const loginRes = await fetchLogin(credentialsJson);

    const loginResJson = await loginRes.json()

    if (loginResJson.token) {
        console.log("enfin le TOKEN" + loginResJson.token);
        window.localStorage.setItem("token", loginResJson.token);
        document.location.href = "index_login.html";
    } 
    else if (loginResJson.status == 400) {
        alert("Merci de remplir tous les champs");
    } else if (loginResJson.status == 500) {
        alert("Erreur serveur");} 
    else{
        alert("Identifiant ou mot de passe incorrect");
    }
    }


formul.addEventListener("submit", async function (event) {
    event.preventDefault();
    await login(event)
})
