const token = sessionStorage.getItem("token");

if(token !== null){

    //----------------------------------Affichage des travaux dans la modal---------------------------------------------//
    
    var workUrl = 'http://localhost:5678/api/works'; 

    fetch(workUrl)                              //fetch de récupération des travaux
    .then(response => {
        if(!response.ok){
            throw new Error('erreur de réseau');
        }
        return response.json();
    })
    .then(data => {

        let compteur = 1;
        let travaux = 0;

        while(travaux < data.length){
            var travail = data.find(object => object.id === compteur)
            if(travail){
                travaux++;
                afficherModal(travail);
            }
            compteur++         
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
    });

    function afficherModal(travail){                        //fonction qui créer les images et les boutons supprimer
        var divTravaux = document.createElement('div');
        var img = document.createElement('img');
        var button = document.createElement('button');
        var poubelle = document.createElement('i');

        button.classList.add("boutonSupprimer");
        button.id = travail.id;

        let delWorkUrl = workUrl + "/" +button.id;
        let classTravail = ".gallery_" + travail.id;
        let travailGallery = document.querySelector(classTravail);

        button.addEventListener('click', function(event){               //ajout d'un fetch(DELETE) dans chaque bouton supprimer 

                fetch(delWorkUrl, {
                    method : 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error('Erreur lors de la requete à API');
                    }
                    divTravaux.remove();
                    travailGallery.remove();
                })
                .catch(error => {
                    console.error('Erreur : ',error);
                })

        });

        poubelle.classList.add('fa-trash-can','fa-solid');
        img.src = travail.imageUrl;

        var photoModal = document.getElementById('photoModal');

        button.appendChild(poubelle);                               //ajout des éléments sur la page HTML

        divTravaux.appendChild(img);
        divTravaux.appendChild(button);

        photoModal.appendChild(divTravaux);
    }

    window.addEventListener('click', (event) => {   //ferme la modale lors d'un clique en dehors
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    boutonQuitter = document.getElementById('quitterModal');    //Bouton pour fermer la modale
    boutonQuitter.addEventListener('click', (event) => {
        modal.style.display = "none";
    })

    titreModal = document.getElementById("titreModal");             //bouton pour afficher la partie ajout de travail
    divAjoutTravail = document.getElementById('divAjoutTravail');
    boutonAjout = document.getElementById('ajoutTravail');
    boutonAjout.addEventListener('click', (event) => {
        photoModal.style.display = 'none';
        titreModal.textContent = "Ajout Photo";
        divAjoutTravail.style.display = 'flex';
        boutonRetour.style.display = 'block';
    })

    var boutonRetour = document.getElementById('retour');       //bouton pour retourner à la partie suppression de travaux
    boutonRetour.addEventListener('click', (event) => {
        photoModal.style.display = null;
        divAjoutTravail.style.display='none';
        boutonRetour.style.display = 'none';
    })


    var inputImage = document.getElementById('inputImage');

    inputImage.addEventListener('change', function(){
        var file = this.files[0];

        if(file.size / (1024*1024) > 4){
            console.log("image trop grosse");
        }
        else{
            console.log("image récupéré");
        }
    })
}