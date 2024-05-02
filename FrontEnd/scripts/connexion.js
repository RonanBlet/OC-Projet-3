//----------------------------------Connexion---------------------------------------------//

const url = "http://localhost:5678/api/users/login";

const form = document.getElementById("login");
const erreurConnexion = document.getElementById('erreurConnexion');

form.addEventListener("submit", handleSubmit);


let idUtilisateur = 0;
let token = "";


function handleSubmit(event){                                   //fonction au moment du clique sur le bouton de connexion
    event.preventDefault();


    const email = document.getElementById("email").value;       //récupération de l'Email et mot de passe de l'utilisateur
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

    fetch(url, options)                                             //envoie de la requete avec les données et options définies plus tôt
        .then(response => {
            if(!response.ok) {
                throw new Error("erreur lors de la requete");
            }
            return response.json();
        })
        .then(data => {                                             //si connexion -> récupération du token / stockage dans le local storage, retour vers l'index
            idUtilisateur = data.userId;
            token = data.token;
            sessionStorage.setItem("token",token);
            window.location.href = './index.html'
        })
        .catch(error => {
            erreurConnexion.classList.remove('hidden');                             //si problème -> affichage d'un texte  : Utilisateur inconnu
        })
    


}

