const token = sessionStorage.getItem("token");

if(token !== null){

    var login = document.getElementById('login');

    login.textContent = 'logout';

    login.addEventListener('click', function(event) {
        event.preventDefault();
        sessionStorage.removeItem("token");
        location.reload();
    })

    var modifier = document.createElement('a');
    modifier.textContent = 'modifier';
    modifier.href = 'modal';

    modifier.addEventListener('click', function(event) {
        event.preventDefault();
        let modal = document.getElementById('modal');
        modal.style.display = 'flex';
    });

    var categories = document.getElementById('categories');
    categories.appendChild(modifier);


    var workUrl = 'http://localhost:5678/api/works';

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
            afficherModal(travail);
        }
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données', error);
    });

    function afficherModal(travail){
        var divTravaux = document.createElement('div');
        var img = document.createElement('img');
        var button = document.createElement('button');
        var poubelle = document.createElement('i');

        button.classList.add("boutonSupprimer");
        button.id = travail.id;

        let delWorkUrl = workUrl + "/" +button.id;
        let classTravail = ".gallery_" + travail.id;
        let travailGallery = document.querySelector(classTravail);

        button.addEventListener('click', function(event){

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

        button.appendChild(poubelle);

        divTravaux.appendChild(img);
        divTravaux.appendChild(button);

        photoModal.appendChild(divTravaux);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

}