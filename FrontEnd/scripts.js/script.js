fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    works = data;
    worksCreation(works); // Affiche tous les travaux par défaut
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux:', error);
  });

let works = [];

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
const btnAll = document.querySelector('.main');
btnAll.addEventListener('click', function() {
  worksCreation(works); // Affiche tous les travaux
}); 

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

function filteredWorks(category) {
  let filtered = works.filter(work => work.category.name === category);
  return filtered;
}
document.addEventListener('DOMContentLoaded', function() {
        fetchCategories(); // Récupère les catégories et crée les boutons
      });
      
function createCategoryButtons(categories) {
  const buttonsContainer = document.querySelector('.filter');
  
  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.addEventListener('click', function() {
      filtered = filteredWorks(category.name);
      worksCreation(filtered); // Affiche les travaux de la catégorie sélectionnée
    });
    buttonsContainer.appendChild(button);
  });
}

const token = window.localStorage.getItem("token");
if (token) {
  adminPage();
}
function adminPage() {
  const buttonsContainer = document.querySelector('.filter');
  const logOut = document.getElementById("log");
  const galleryTitle = document.querySelector(".project");
  const modElements = document.querySelectorAll(".mod"); // Sélectionne tous les éléments avec la classe 'mod'

  const token = window.localStorage.getItem('token'); // Récupère le token du stockage local

  if (token) {
    // Si un token est présent dans le stockage local, afficher les éléments de classe 'mod'
    modElements.forEach(element => {
      element.style.display = 'flex';
    });
  }

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
// Modale

const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// ouverture de la modale au clique sur le bouton 
btn.onclick = function() {
  modal.style.display = "block";
}

// si l'utilisateur clique sur l'élément <span> x alors la fenetre ce ferme
span.onclick = function() {
  modal.style.display = "none";
}

// si l'utilisateur clique hors de la modale celle ci ce ferme
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Fonction pour ajouter les éléments des travaux à la modale
function createWorkElementsInModal(worksDisplayed) {
  const modalGallery = document.querySelector(".modal-gallery");

  modalGallery.innerHTML = ''; // Efface les éléments existants dans la modale

  worksDisplayed.forEach(work => {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");

    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;

    figureElement.appendChild(imageElement);
    modalGallery.appendChild(figureElement);
  });
}


// Au clic sur le bouton, ouvrir la modale et afficher les travaux
btn.onclick = function() {
  modal.style.display = "block";
  createWorkElementsInModal(works); // Affiche tous les travaux dans la modale
}

// Récupérer le bouton "Ajouter une photo"
const addPhotoButton = document.querySelector('.addcontent .button');

// Récupérer la modale d'ajout de photo
const modalAddPhoto = document.getElementById('myModalAddPhoto');
const returnBtn = document.querySelector(".return_btn")
const closeAdd = document.getElementsByClassName("close_add_photo")[0];

// Gestion de l'ouverture de la modale d'ajout de photo
addPhotoButton.addEventListener('click', function() {
  modalAddPhoto.style.display = 'block';
  modal.style.display = "none";
});

// si l'utilisateur clique sur l'élément <span> x alors la fenetre ce ferme
closeAdd.onclick = function() {
  modalAddPhoto.style.display = "none";
}

returnBtn.addEventListener('click', function(){
  modalAddPhoto.style.display = "none";
  modal.style.display = "block";
})


function populateCategoryDropdown(categories) {
  const selectElement = document.getElementById('categorySelect');

  categories.forEach(category => {
    const option = document.createElement('option');
    option.textContent = category.name;
    option.value = category.name;

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

document.addEventListener('DOMContentLoaded', function() {
  fetchCategoriesAndPopulateDropdown(); // Récupérer les catégories et peupler le menu déroulant
});
