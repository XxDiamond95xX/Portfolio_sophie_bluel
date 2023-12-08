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
      