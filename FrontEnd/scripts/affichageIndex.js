//----------------------------------Affichage des travaux---------------------------------------------//

const workRouteUrl = 'http://localhost:5678/api/works';

const affichageTravail = document.getElementById('gallery');

affichageTravail.innerHTML = '';

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
        const travail = data.find(object => object.id === compteur)       
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
        const divTravail = document.createElement('figure');
        const imageTravail = document.createElement('img');
        const nomTravail = document.createElement('figcaption');

        imageTravail.src = travail.imageUrl;
        nomTravail.textContent = travail.title;

        divTravail.id = travail.category.name;
        divTravail.classList.add('gallery_' + travail.id);
        divTravail.appendChild(imageTravail);
        divTravail.appendChild(nomTravail);

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
            const categorie = data.find(object => object.id === i)
            afficherCategories(categorie);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
    });


const affichageCategorie = document.getElementById('categories');

function afficherCategories(categorie){                             //Ajout de la fonction d'affichage des travaux en fonction de la catégorie

    const boutonCategorie = document.createElement('button');

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

    affichageCategorie.appendChild(boutonCategorie);

}

const boutonTous = document.getElementById('tous');

boutonTous.addEventListener('click', function(){
    affichageTous();
})


//------Fonction d'affichage des travaux en fonction de la catégorie-----//

function affichageTous(){                           
    const travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        const travail = travaux[i];
        travail.classList.remove('hidden');
    }
}

function affichageObjets(){

    const travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        const travail = travaux[i];
        if(travail.id !== 'Objets'){
            travail.classList.add('hidden');
        }
        else{
            travail.classList.remove('hidden');
        }
    }
}

function affichageAppartements(){
    const travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        const travail = travaux[i];
        if(travail.id !== 'Appartements'){
            travail.classList.add('hidden');
        }
        else{
            travail.classList.remove('hidden');
        }
    }
}

function affichageHotelResto(){
    const travaux = document.getElementsByTagName('figure');

    for(let i = 1; i < travaux.length; i++){
        const travail = travaux[i];
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

    const login = document.getElementById('login');           //Passage de login -> logout et gestion de la déconnexion (suppression du token)
    login.textContent = 'logout';                               
    login.addEventListener('click', function(event) {           
        event.preventDefault();
        sessionStorage.removeItem("token");
        location.reload();
    })

    const divModifier = document.getElementById('modifierProjet');     //Affichage de l'icone et du lien vers la modale       
    divModifier.classList.remove('hidden');

    const modifier = document.getElementById('lienModal');             //Fonctionnement du lien       
    modifier.addEventListener('click', function(event) {        
        event.preventDefault();
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    });

    const barreNoire = document.getElementById("barreNoire");           //affichage de la barre noire
    const header = document.getElementById('header');

    barreNoire.style.display = 'block';
    header.style.marginTop = '80px';
    
    affichageCategorie.style.display = 'none';
    affichageTravail.style.marginTop = '50px';

}
