// Import des travaux depuis l'api  

function fetchWork() {
    fetch("http://localhost:5678/api/works")
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des travaux');
        }
        let works = [];
        return response.json();
    })
    .then(data => {
      works = data;
      worksCreation(works); // Affiche tous les travaux par défaut
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des travaux:', error);
    });
}

// Gestion de l'affichage des travaux 

function worksCreation(worksDisplayed) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ''; // Efface les éléments existants
    
    worksDisplayed.forEach(work => {
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      const textElement = document.createElement("figcaption");
      
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
      textElement.textContent = work.title;
      
      figureElement.appendChild(imageElement);
      figureElement.appendChild(textElement);
      gallery.appendChild(figureElement);
    });
  }

  // Import des catégories depuis l'API

function fetchCategories() {
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
      createCategoryButtons(data); // Crée les boutons pour chaque catégorie
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des catégories:', error);
    });
  }
  
  // gestions des catégories et créations des boutons de filtres 
  
  function filteredWorks(category) {
    let filtered = works.filter(work => work.category.name === category);
    return filtered;
  }
  
  function createCategoryButtons(categories) {
    const buttonsContainer = document.querySelector('.filter');
    
    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('filter_btn');
      button.textContent = category.name;
      button.addEventListener('click', function() {
        filtered = filteredWorks(category.name);
        worksCreation(filtered); // Affiche les travaux de la catégorie sélectionnée
      });
      buttonsContainer.appendChild(button);
    });
  }
  
  // Gestion de la page d'accueil selon le statut de connexion

  function adminPage() {
    const buttonsContainer = document.querySelector('.filter');
    const logOut = document.getElementById("log");
    const galleryTitle = document.querySelector(".project");
    const modElements = document.querySelectorAll(".mod"); // Sélectionne tous les éléments avec la classe 'mod'
    const editionBar = document.querySelector(".edition-bar")
    const token = window.localStorage.getItem('token'); // Récupère le token du stockage local
  
    if (token) {
      // Si un token est présent dans le stockage local, afficher les éléments de classe 'mod'
      modElements.forEach(element => {
        element.style.display = 'flex';
      });
    }
    editionBar.style.display = 'flex'
    logOut.textContent = 'logout';
    buttonsContainer.style.display = 'none';
    galleryTitle.style.margin = '5rem 1rem';
  
    logOut.addEventListener('click', function() {
      // Supprimer le token du stockage local
      window.localStorage.removeItem('token');
      // Rediriger vers la page de connexion
      window.location.href = 'login.html';
    });
  }

  // Création des éléments présent dans la modale 

  function createWorkElementsInModal(worksDisplayed) {
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.innerHTML = ''; // Efface les éléments existants dans la modale
  
    worksDisplayed.forEach(work => {
      const figureElement = document.createElement("figure");
      const imageElement = document.createElement("img");
      const deleteButton = document.createElement("button"); // Bouton de suppression
  
      imageElement.src = work.imageUrl;
      imageElement.alt = work.title;
  
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      deleteButton.classList.add('deleteBtn');
  
      figureElement.appendChild(imageElement);
      figureElement.appendChild(deleteButton);
      modalGallery.appendChild(figureElement);
  
      deleteButton.addEventListener('click', function() {
        const workId = work.id;
        const token = window.localStorage.getItem('token'); // Récupère le token du localStorage
  
        // Requête DELETE vers l'API pour supprimer le projet avec le token d'authentification
        fetch(`http://localhost:5678/api/works/${workId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la suppression du projet');
            }
            // Si la suppression est réussie du côté de l'API, supprime visuellement l'élément figure correspondant au projet dans la modale
            figureElement.remove();
          })
          .catch(error => {
            console.error('Erreur lors de la suppression du projet:', error);
          });
      });
    });
  }
  
  // Réinitialisation des champs de la modale 
  
  function resetModalFields() {
    const addTxt = document.getElementById('addtxt');
    const categorySelect = document.getElementById('categorySelect');
    const photoUploadInput = document.getElementById('photo-upload');
    const imagePreview = document.getElementById('imagePreview');
    
    addTxt.value = ''; // Réinitialise le champ de texte
    categorySelect.selectedIndex = 0; // Réinitialise la sélection de la catégorie
    photoUploadInput.value = ''; // Efface le chemin du fichier sélectionné
    imagePreview.src = ''; // Efface l'aperçu de l'image
    imagePreview.style.display = 'none'; // Cache l'élément de prévisualisation de l'image
  }
  
  // Import des catégories dans le menu déroulant de la modale 
  
  function populateCategoryDropdown(categories) {
    const selectElement = document.getElementById('categorySelect');
  
    categories.forEach(category => {
      const option = document.createElement('option');
      option.textContent = category.name;
      option.value = category.id;
  
      selectElement.appendChild(option);
    });
  
  }

  function fetchCategoriesAndPopulateDropdown() {
    fetch("http://localhost:5678/api/categories")
      .then(response => response.json())
      .then(data => {
        populateCategoryDropdown(data); // Remplir le menu déroulant avec les catégories
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }