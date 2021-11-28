//__________ Pour afficher le panthéon ENSG __________
document.getElementById("pantheon").onclick = function () {
    location.href = "html/pantheon.html";
}

//__________ Pour lancer le jeu __________
function openPopup() {
    document.getElementById("PopupJeu").style.display = "block";
  }

//__________ Pour lancer le jeu __________

function closePopup() {
    document.getElementById("PopupJeu").style.display = "none";
  }

//__________ Pour lancer le jeu en invité __________
document.getElementById("jouer-invit").onclick = function () {
    location.href = "html/teaser.html?pseudo=Invite";
}
//_____________ Récupération du hall of fame ______________
fetch('php/joueur.php')
.then(result => result.json())
.then(result => {
  //Mise en forme des résultats sous forme d'un tableau
  // en-tête du tableau
  document.getElementById('hall_of_fame').innerHTML+="<table id='hof'><thead><tr><th>Rang</th><th>Pseudo</th><th>Score</th></tr></thead>";

  // corps du tableau
  for (var i = 0; i < result.length; i++) {
  document.getElementById('hof').innerHTML+="<tbody><tr><td>"+(i+1)+"</td><td>"+result[''+i+'']['pseudo']+"</td><td>"+result[''+i+'']['score']+"</td>";
  }
  
});

//_________ Ouverture de la popup pour jouer ___________________

var popUp = document.getElementById("popup");
var square = document.getElementById("square");

function showPopup(){
   popUp.style.visibility = "visible";
}

function hidePopup(){
   popUp.style.visibility = "hidden";
}

//_________ Pour valider le formulaire d'entrée dans le jeu ___________________

let form_inscription = document.getElementById("EntreeJeu");

function valider (event) {
    let champ_pseudo = form_inscription.elements["pseudo"];

    // Vérification pour savoir si le formulaire est ok
    let form_OK = true;

    if(champ_pseudo.value == ""){
        form_OK = false;
        champ_pseudo.classList.add("notValid");
    } else{
        champ_pseudo.classList.remove("notValid");
    }

    // Au final, on empeche l'envoi du formulaire si form_OK est faux
    if(!form_OK){
        event.preventDefault();
    }

}

/* ajoute l’événement */
try{form_inscription.addEventListener('submit', valider);}
catch{}

