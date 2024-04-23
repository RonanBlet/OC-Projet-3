//----------------------------------Affichage des travaux---------------------------------------------//

const workRouteUrl = 'http://localhost:5678/api/works';

fetch(workRouteUrl)                                 //fetch de récupération des travaux
    .then(response => {
        if(!response.ok){
            throw new Error('erreur de réseau');
        }
        return response.json();
    })
    .then(data => {
        let compteur = 1;       //nombre de boucle de recherche de travaux
        let travaux = 0;        //nombre de travaux trouvés

        while(travaux < data.length){                                       //Boucle qui vérifie le nombre de travaux trouvés 
            var travail = data.find(object => object.id === compteur)       
            if(travail){
                afficherTravail(travail);
                travaux++;
            }
            compteur++         
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
    });
    

function afficherTravail(travail){
        var divTravail = document.createElement('figure');
        var imageTravail = document.createElement('img');
        var nomTravail = document.createElement('figcaption');

        imageTravail.src = travail.imageUrl;
        nomTravail.textContent = travail.title;

        divTravail.id = travail.category.name;
        divTravail.classList.add('gallery_' + travail.id);
        divTravail.appendChild(imageTravail);
        divTravail.appendChild(nomTravail);

        var affichageTravail = document.getElementById('gallery');
        affichageTravail.appendChild(divTravail);
}

//----------------------------------Affichage des catégories---------------------------------------------//

const categoriesRouteUrl = 'http://localhost:5678/api/categories';


fetch(categoriesRouteUrl)                           //Fetch de récupération des catégories
    .then(response => {
        if(!response.ok){
            throw new Error('erreur de réseau');
        }
        return response.json();
    })
    .then(data => {

        for(let i = 1; i <= data.length; i++){
            var categorie = data.find(object => object.id === i)
            afficherCategories(categorie);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
    });



function afficherCategories(categorie){                             //Ajout de la fonction d'affichage des travaux en fonction de la catégorie

    var boutonCategorie = document.createElement('button');

    switch(categorie.id){
        case 1 : 

        boutonCategorie.addEventListener('click', function(){
            affichageObjets();
        })

        break;

        case 2 : 

        boutonCategorie.addEventListener('click', function(){
            affichageAppartements();
        })
        
        break;

        case 3 : 

        
        boutonCategorie.addEventListener('click', function(){
            affichageHotelResto();
        })


        break;
    }

    boutonCategorie.textContent = categorie.name;

    var affichageCategorie = document.getElementById('categories');
    affichageCategorie.appendChild(boutonCategorie);

}

var boutonTous = document.getElementById('tous');

boutonTous.addEventListener('click', function(){
    affichageTous();
})


//------Fonction d'affichage des travaux en fonction de la catégorie-----//

function affichageTous(){                           
    var travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        var travail = travaux[i];
        travail.classList.remove('hidden');
    }
}

function affichageObjets(){

    var travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        var travail = travaux[i];
        if(travail.id !== 'Objets'){
            travail.classList.add('hidden');
        }
        else{
            travail.classList.remove('hidden');
        }
    }
}

function affichageAppartements(){
    var travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        var travail = travaux[i];
        if(travail.id !== 'Appartements'){
            travail.classList.add('hidden');
        }
        else{
            travail.classList.remove('hidden');
        }
    }
}

function affichageHotelResto(){
    var travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        var travail = travaux[i];
        if(travail.id !== 'Hotels & restaurants'){
            travail.classList.add('hidden');
        }
        else{
            travail.classList.remove('hidden');
        }
    }
}

//--------------------------------------------Changement après connexion------------------------------------------------//


if(sessionStorage.getItem('token') !== null){

    var login = document.getElementById('login');           //Passage de login -> logout et gestion de la déconnexion (suppression du token)
    login.textContent = 'logout';                               
    login.addEventListener('click', function(event) {           
        event.preventDefault();
        sessionStorage.removeItem("token");
        location.reload();
    })

    var divModifier = document.getElementById('modifierProjet');     //Affichage de l'icone et du lien vers la modale       
    divModifier.classList.remove('hidden');

    var modifier = document.getElementById('lienModal');             //Fonctionnement du lien       
    modifier.addEventListener('click', function(event) {        
        event.preventDefault();
        let modal = document.getElementById('modal');
        modal.style.display = 'flex';
    });
}