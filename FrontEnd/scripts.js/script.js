// Import des travaux depuis l'api  
function fetchWork() {
  fetch("http://localhost:5678/api/works")
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des travaux');
      }
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


  let works = [];


fetchWork ()

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
btnAll.classList.add('filter_btn');
btnAll.addEventListener('click', function() {
  worksCreation(works); // Affiche tous les travaux
}); 

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

document.addEventListener('DOMContentLoaded', function() {
        fetchCategories(); // Récupère les catégories et crée les boutons
});
      
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

// création de la partie "Admin" du site 

const token = window.localStorage.getItem("token");
if (token) {
  adminPage();
}  // Récupération du token et sauvegarde dans le local storage  

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
const addModal = document.getElementById("myModalAddPhoto");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

// Ouverture de la modale au clic sur le bouton
btn.onclick = function() {
  modal.style.display = "block";
}

// Si l'utilisateur clique sur l'élément <span> x, la fenêtre se ferme
span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == addModal) {
    addModal.style.display = "none";
    resetModalFields(); // Réinitialise les champs de la modale
  }
}

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

// Au clic sur le bouton, ouvrir la modale et afficher les travaux
btn.onclick = function() {
  modal.style.display = "block";
  createWorkElementsInModal(works); // Affiche tous les travaux dans la modale
}

// Récupere le bouton "Ajouter une photo"
const addPhotoButton = document.querySelector('.addcontent .button');

// Récupere la modale d'ajout de photo
const modalAddPhoto = document.getElementById('myModalAddPhoto');
const returnBtn = document.querySelector(".return_btn")
const closeAdd = document.getElementsByClassName("close_add_photo")[0];

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

// Gestion de l'ouverture de la modale d'ajout de photo
addPhotoButton.addEventListener('click', function() {
  modalAddPhoto.style.display = 'block';
  modal.style.display = "none";
  resetModalFields()
});

// si l'utilisateur clique sur l'élément <span> x alors la fenetre ce ferme
closeAdd.onclick = function() {
  modalAddPhoto.style.display = "none";
  resetModalFields()
}

returnBtn.addEventListener('click', function(){
  modalAddPhoto.style.display = "none";
  modal.style.display = "block";
  resetModalFields()
})

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

document.addEventListener('DOMContentLoaded', function() {
  fetchCategoriesAndPopulateDropdown(); // Récupérer les catégories et peupler le menu déroulant
});

// Gestion de la modale lors de la prévisualisation de l'image uploader

document.addEventListener('DOMContentLoaded', function() {
  const photoUploadInput = document.getElementById('photo-upload');
  const imagePreview = document.getElementById('imagePreview');
  const addSpan = document.querySelector('.addSpan')

  photoUploadInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              imagePreview.src = e.target.result;
              imagePreview.style.display = 'block';
          }
          reader.readAsDataURL(file);
      } else {
          imagePreview.style.display = 'none';
      }
  });
});

const inputField = document.getElementById('addtxt');
const submitButton = document.querySelector('.add_btn');

inputField.addEventListener('input', function() {
  if (this.checkValidity()) {
    submitButton.classList.add('valid'); // Ajoute une classe 'valid' lorsque le champ est valide
  } else {
    submitButton.classList.remove('valid'); // Retire la classe 'valid' si le champ devient invalide
  }
});

submitButton.addEventListener('click', async function(event) {
  event.preventDefault();

  const addTxt = document.getElementById('addtxt');
  const categorySelect = document.getElementById('categorySelect');
  const photoUploadInput = document.getElementById('photo-upload');

  const title = addTxt.value;
  const category = categorySelect.value;
  const imageFile = photoUploadInput.files[0];

  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('image', imageFile);

  const token = window.localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: formData
    });

    if (response.ok) {
      modalAddPhoto.style.display = 'none';
      resetModalFields();
      fetchWork();
    } else {
      console.error('Erreur lors de la récupération des travaux:', error);
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du contenu:', error);
  }
});



