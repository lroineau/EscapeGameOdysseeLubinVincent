//__________________________________________________________________________________________________
//                    Permet de gérer la validation du formulaire de la page d'accueil
//__________________________________________________________________________________________________


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
form_inscription.addEventListener('submit', valider);
