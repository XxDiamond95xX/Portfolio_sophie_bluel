document.addEventListener('DOMContentLoaded', function() {
  fetchWork()  
  const btnAll = document.querySelector('.main');
  btnAll.classList.add('filter_btn');
  btnAll.addEventListener('click', function() {
    worksCreation(works); // Affiche tous les travaux
  }); 

  // Récupère les catégories et crée les boutons
  fetchCategories(); 
  
  // Récupération du token et sauvegarde dans le local storage  
  const token = window.localStorage.getItem("token");
  if (token) {
    adminPage();
  } 
});
      

