// Modale

// Gestion de la modale lors de la prévisualisation de l'image uploader

document.addEventListener('DOMContentLoaded', function() {
    const photoUploadInput = document.getElementById('photo-upload');
    const imagePreview = document.getElementById('imagePreview');
    // const addSpan = document.querySelector('.addSpan')
    
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

// Récupérer les catégories et peupler le menu déroulant
document.addEventListener('DOMContentLoaded', function() {
  fetchCategoriesAndPopulateDropdown(); 
});

// Récupération de la modale principale
const modal = document.getElementById("myModal");
const addModal = document.getElementById("myModalAddPhoto");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
// Récuperation de la modale d'ajout de photo
const modalAddPhoto = document.getElementById('myModalAddPhoto');
const returnBtn = document.querySelector(".return_btn")
const closeAdd = document.getElementsByClassName("close_add_photo")[0];
// Récuperation du bouton "Ajouter une photo"
const addPhotoButton = document.querySelector('.addcontent .button');
// Récuperation partiel du formulaire 
const inputField = document.getElementById('addtxt');
const submitButton = document.querySelector('.add_btn');

// Ouverture de la modale au clic sur le bouton
btn.addEventListener('click',function() {
  modal.style.display = "block";
})

// Gestion de l'ouverture de la modale d'ajout de photo
btn.addEventListener('click', function() {
  modal.style.display = "block";
  createWorkElementsInModal(works); // Affiche tous les travaux dans la modale
})

addPhotoButton.addEventListener('click', function() {
    modalAddPhoto.style.display = 'block';
    modal.style.display = "none";
    resetModalFields()
});

// Gestion de la fermeture des fenetres modale.

span.addEventListener('click', function() {
  modal.style.display = "none";
})

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == addModal) {
    addModal.style.display = "none";
    resetModalFields(); // Réinitialise les champs de la modale
  }
})

closeAdd.addEventListener('click', function() {
  modalAddPhoto.style.display = "none";
  resetModalFields()
})

returnBtn.addEventListener('click', function() {
  modalAddPhoto.style.display = "none";
  modal.style.display = "block";
  resetModalFields()
})

// Gestion du formulaire 
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





















