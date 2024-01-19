document.addEventListener("DOMContentLoaded", function() {
  // Quand le formulaire est soumis
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    // Empêche le formulaire de se soumettre normalement (rechargement de la page)
    event.preventDefault(); 

    // Récupère les valeurs des champs email et mot de passe
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error")

    // Crée un objet avec les données de l'utilisateur
    const userData = {
      email: email,
      password: password
    };
    
    // Envoie les données au serveur
    fetch("http://localhost:5678/api/users/login", {
      method: "POST", //  envoi des données
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(userData) // Transforme l'objet en format JSON pour l'envoyer au serveur
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Échec de la connexion");
      }
    })
    .then(data => { 
      // Récupération du token dans le local storage 
      const token = data.token;
      window.localStorage.setItem("token", token);
      // Redirige vers la page index.html si la connexion est réussie
      window.location.href = "index.html";
    })
    .catch(error => {
    
      // Afficher l'élément d'erreur
       errorMsg.style.display = "block";
      console.error("Erreur lors de la tentative de connexion :", error);

    });
  });
});








  
