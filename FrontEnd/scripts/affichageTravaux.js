const workRouteUrl = 'http://localhost:5678/api/works';

fetch(workRouteUrl)
    .then(response => {
        if(!response.ok){
            throw new Error('erreur de réseau');
        }
        return response.json();
    })
    .then(data => {
        for(let i = 1; i <= data.length; i++){
            var travail = data.find(object => object.id === i)
            afficherTravail(travail);
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
        divTravail.appendChild(imageTravail);
        divTravail.appendChild(nomTravail);

        var affichageTravail = document.getElementById('gallery');
        affichageTravail.appendChild(divTravail);
}
