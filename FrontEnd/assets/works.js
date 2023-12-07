let works = [];

function worksCreation(worksToShow) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ''; // Efface les éléments existants

  worksToShow.forEach(work => {
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

function filteredWorks(category) {
  const filtered = works.filter(work => work.category.name === category);
  return filtered;
}

fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(data => {
    works = data;
    worksCreation(works); // Affiche tous les travaux par défaut
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux:', error);
  });

const btnAll = document.querySelector('.main');
btnAll.addEventListener('click', function() {
  worksCreation(works); // Affiche tous les travaux
});

const btn1 = document.querySelector('.button1');
btn1.addEventListener('click', function() {
  const filtered = filteredWorks('Objets');
  worksCreation(filtered); // Affiche les travaux de la catégorie 'Objets'
});

const btn2 = document.querySelector('.button2');
btn2.addEventListener('click', function() {
  const filtered = filteredWorks('Appartements');
  worksCreation(filtered); // Affiche les travaux de la catégorie 'Appartements'
});

const btn3 = document.querySelector('.button3');
btn3.addEventListener('click', function() {
  const filtered = filteredWorks('Hotels & restaurants');
  worksCreation(filtered); // Affiche les travaux de la catégorie 'Hôtel & restaurants'
});
