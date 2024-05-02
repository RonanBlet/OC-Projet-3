const token = sessionStorage.getItem("token");


if(token !== null){

    //----------------------------------Affichage des travaux dans la modal---------------------------------------------//
    
    const workUrl = 'http://localhost:5678/api/works'; 

    fetchWorkModal();

    function fetchWorkModal(){

        photoModal.innerHTML = "";

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
                let travail = data.find(object => object.id === compteur)
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
    }
    

    function afficherModal(travail){                        //fonction qui créer les images et les boutons supprimer
        const divTravaux = document.createElement('div');
        const img = document.createElement('img');
        const button = document.createElement('button');
        const poubelle = document.createElement('i');

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

    //----------------------------------Gestion des cliques avec la modale---------------------------------------------//

    window.addEventListener('click', (event) => {   //ferme la modale lors d'un clique en dehors
        if (event.target === modal) {
            modal.style.display = 'none';
            formReset();
        }
    });

    boutonQuitter = document.getElementById('quitterModal');    //Bouton pour fermer la modale
    boutonQuitter.addEventListener('click', (event) => {
        modal.style.display = "none";
        retour();
        formReset();
    })

    titreModal = document.getElementById("titreModal");             //bouton pour afficher la partie ajout de travail
    formAjoutTravail = document.getElementById('formAjoutTravail');
    boutonAjout = document.getElementById('ajoutTravail');
    boutonAjout.addEventListener('click', (event) => {
        photoModal.style.display = 'none';
        titreModal.textContent = "Ajout Photo";
        formAjoutTravail.style.display = 'flex';
        boutonAjout.style.display = 'none';
        boutonRetour.style.display = 'block';
    })

    const boutonRetour = document.getElementById('retour');       //bouton pour retourner à la partie suppression de travaux
    boutonRetour.addEventListener('click', (event) => {
        retour();
        formReset();
    })

    function retour(){
        photoModal.style.display = null;
        formAjoutTravail.style.display='none';
        boutonRetour.style.display = 'none';
        boutonAjout.style.display = 'block';
    }

    const inputImage = document.getElementById('inputImage');       //Bouton pour récupérer l'image
    const divBoutonImage = document.getElementById('boutonImage');
    const divAjoutImage = document.getElementById('divAjoutImage');
    const erreurImage = document.createElement('p');
    let imageForm;

    inputImage.addEventListener('change', function(){           //récupération de l'image
        let file = this.files[0];

        if(file.size / (1024*1024) > 4){
            erreurImage.textContent = "Image trop lourde";
            erreurImage.style.color = 'red';
            divBoutonImage.appendChild(erreurImage);
        }
        else{

            imageForm = file;
            const image = document.createElement('img');          //ajout de l'image à la place du bouton/text/icon
            image.src = URL.createObjectURL(file);
            image.classList.add('imageRecupere');

            divBoutonImage.style.display = 'none';
            divAjoutImage.appendChild(image);
            verifierChamps();
        }
    })

    //----------------------------------Traitement de l'ajout du travail---------------------------------------------//


    const form = document.getElementById('formAjoutTravail');
    const titre = document.getElementById('titre');
    const categorie = document.getElementById('choixCategorieModal');
    const erreurForm = document.getElementById('erreurForm');

    form.addEventListener('submit', function(event){
        event.preventDefault();

        if(!imageForm || !titre.value || !categorie.value){
            return;
        }
        else{
            const valeursForm = new FormData();

            valeursForm.append('title', titre.value);
            valeursForm.append('image', imageForm);
            valeursForm.append('category', categorie.value);


            const url ="http://localhost:5678/api/works";

        
            const options = {
                method: "POST",
                headers : {
                    'Authorization': `Bearer ${token}`
                },
                body: valeursForm
            };


            fetch(url , options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'envoi des données.');
                }
                return response.json();
            })
            .then(data => {
                formReset();
                indexActualisation();
                fetchWorkModal();
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
        
        }
    })

    //----------------------------------Couleur du bouton Valider---------------------------------------------//

    const bouttonValider = document.getElementById('valider');
    function verifierChamps(){
        if(imageForm && titre.value && categorie.value){
            bouttonValider.style.backgroundColor = '#1D6154';
            bouttonValider.style.border = "solid 1px #1D6154";
        }
        else{
            bouttonValider.style.backgroundColor = '#A7A7A7';
            bouttonValider.style.border = "none";
        }
    }

    titre.addEventListener('input', verifierChamps);
    categorie.addEventListener('input', verifierChamps);

    //----------------------------------Actualisation de l'index---------------------------------------------//

    const workRouteUrl = 'http://localhost:5678/api/works';

    function indexActualisation(){
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

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

        
    }

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

    //----------------------------------Reset de la modale---------------------------------------------//

    function formReset(){

        retour();
        form.reset();
        imageForm = null;
        erreurForm.classList.add('hidden');

        divBoutonImage.style.display = 'block';

        const nouvelleImage = document.querySelector('.imageRecupere');
        if(nouvelleImage){
            nouvelleImage.remove();
        }

        if(erreurImage){
            erreurImage.remove();
        }
        
        bouttonValider.style.backgroundColor = '#A7A7A7';
	    bouttonValider.style.border = 'none';
        titreModal.textContent = 'Galerie photo';

    }
}