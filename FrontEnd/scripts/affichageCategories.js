const categoriesRouteUrl = 'http://localhost:5678/api/categories';



fetch(categoriesRouteUrl)
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



function afficherCategories(categorie){

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
