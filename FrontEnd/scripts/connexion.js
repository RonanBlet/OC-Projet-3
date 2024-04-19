const url = "http://localhost:5678/api/users/login";

const form = document.getElementById("login");

form.addEventListener("submit", handleSubmit);

var probleme = document.createElement('p');
probleme.textContent = 'Utilisateur inconnu'

var idUtilisateur = 0;
var token = "";


function handleSubmit(event){
    event.preventDefault();


    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = {
        email : email,
        password:password 
    };

    const options = {
        method: "POST",
        headers : {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(url, options)
        .then(response => {
            if(!response.ok) {
                throw new Error("erreur lors de la requete");
            }
            return response.json();
        })
        .then(data => {
            idUtilisateur = data.userId;
            token = data.token;
            sessionStorage.setItem("token",token);
            window.location.href = './index.html'
        })
        .catch(error => {
            form.appendChild(probleme);
        })
    


}

