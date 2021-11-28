// **********************************************************************************************************************
//                                    Script qui gère la connection à la base de donnée et le jeu
// **********************************************************************************************************************

//_________________________________Gestion du chrono___________________________________//

let $chrono = document.getElementById('chrono');

let heure_debut = new Date()


setInterval( () => {
    let heure = new Date().toLocaleTimeString('fr');
    let hr = new Date();
    let chrono= (hr-heure_debut);
    chrono_sec=Math.floor(chrono/1000)    
    console.log(hr-heure_debut);
    
    //conversion du chrono en min/sec
    var minutes = Math.floor(chrono_sec / 60);
    var seconds = chrono_sec - minutes * 60;
    var chrono_final = affichageChrono(minutes,'0',2)+':'+affichageChrono(seconds,'0',2);

    $chrono.innerHTML = chrono_final;  
}, 1000);


function affichageChrono(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}



//____________________________Recupération du pseudo et affichage ____________________________

var pseudo=document.location.search;
pseudo=pseudo.split('=')[1];

document.getElementById('information').innerHTML += "<h3><u>Joueur :</u> " +pseudo +" <h3>" ;


/// _________________________Affichage et récupération de la carte Leaflet_______________________



var cartodyssee = L.map('mapid').setView([45.957985822, -1.25813448],12);


L.tileLayer(' http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>Watercolor</a> <b>Escape Game de Vincent HEAU et Lubin ROINEAU</b>"
}).addTo(cartodyssee);

// Récupération du zoom par la fonction fzoom
zoom=cartodyssee.getZoom();

// ____________________________________________________________________________________________________________________
//                                     Fonctions utilisées dans le script 
// _________________________________________________________________________________________________________________

function distance(depart,arrivee) {
    // renvoie la distance en km entre deux points données sous forme d'objets leaflet.
    var lon1 = toRadian(depart["lng"]);
    var lat1 = toRadian(depart["lat"]);
    var lon2 = toRadian(arrivee["lng"]);
    var lat2 = toRadian(arrivee["lat"]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var rayon_terre = 6371;
    var d = Math.round(c * rayon_terre);
    return d;

}

function toRadian(degree) {
  //convertit en radian un angle
    return degree*Math.PI/180;
}



function ajout(pseudo,score){
  // fonction qui ajoute un pseudo et un score dans la base de donnée
  var data = new FormData();
  data.append('pseudo', pseudo);
  data.append('score', score);

  fetch('../php/insert.php', {
      method: 'post',
      body: data
    })
    .then(r => r.text())
    .then(r => {
      console.log(r)
    });
}


function remplace(string){
  // Fonction qui prend une chaine de caractère et renvoie la chaine avec le pseudo 
  // remplacé s'il existe
  try{
    string=string.replace('$pseudo$',pseudo);
  }
  catch{
    console.log("pas de pseudo dans la chaîne de caractère")
  }
  return string;
}

function marqueur(Object){
  // Fonction qui récupère toutes les informations sur les marqueurs de la base de donnée 
  var nom =Object['nom'];
  var icon = L.icon({
      iconUrl: '../media/'+Object['icone']+'',
      iconSize:     [Object['taillex'],Object['tailley']], // taille de l'icone
      iconAnchor:   [20,80], // gestion de l'icone
      popupAnchor:  [40,-80] // gestion de l'ancre de la popup
  });

  var m1=L.marker([Object['lat'], Object['lng']],{
    icon: icon,
    draggable:Object['draggable']
  });
  
  maxZoom=Object['maxZoom'];
  minZoom=Object['minZoom'];

  popup=Object['popup'];
  if (popup!=''){
    m1.bindPopup(popup);
  }
  
  // Identifiant
  //retourne l'identifiant DU BLOQUE  
  ID_bloque=Object['BLOQUE'];
  

  // Fonctionnalité annexes
  FONCTION=Object['FONCTION'];
  INSTRUCTION=Object['INSTRUCTION'];

  return [m1,ID_bloque,FONCTION,INSTRUCTION];
}


function controle_zoom(objet){
   // Fonction qui gère l'affichage d'un objet(marqueur) en fonction du zoom
    zoom=cartodyssee.getZoom();
    if (zoom<minZoom || zoom>maxZoom){}
    else{
      objet.addTo(cartodyssee);
    }

    cartodyssee.on('zoomend',e=>{
      n=inventaire.length-1

      if (inventaire.includes(objet) && objet!=inventaire[n]){
        console.log('on fait plus rien');
      }
      else{
        zoom=cartodyssee.getZoom();
        console.log(zoom);
        if (zoom<minZoom || zoom>maxZoom){
          objet.remove(cartodyssee);
        }
        else{
          objet.addTo(cartodyssee);
        }
      }   
    }); 
}

//__________________________________________________________________________________________________
//                               Architecture du jeu 
//__________________________________________________________________________________________________

//--------------------//
//   Initialisation  //
//------------------//

// Chargement des Objets de l'Etat initial
var inventaire=[]
// barre de progression à 0%
var width = 0;

//Sécurité du début


fetch('../php/objet.php')
.then(result => result.json())
.then(result => {

      // Affichage du jeu à l'étape 1
      ulysse=marqueur(result[0])[0];
      ulysse.addTo(cartodyssee);
      ulysse.openPopup();
      cartodyssee.setView([46.087985822, -1.25813448],10.3);
      bouton_commencer.onclick = function() {
        ulysse.remove(cartodyssee);  
      };
      ulysse.on('click',e=>{
        bouton_commencer.onclick = function() {
          ulysse.remove(cartodyssee);  
        };
      });
      //Sécurité du début(si l'utilisateur a cliqué ailleurs que sur le bouton)
      //Au bout de 15 secondes Ulysse disparaît
      setTimeout(function(){
        try{ulysse.remove(cartodyssee);}
        catch{}
      },40000);

      inventaire.push(ulysse);
      
      //Affichage de l'objet 1
      objet=marqueur(result[1])[0]
      indice=marqueur(result[1])[1];
      controle_zoom(objet);
      var inst=marqueur(result[0])[3];
      document.getElementById("instruction_jeu").innerHTML=inst;

      // On déclenche le jeu
      f(objet);
      
  })

// Le jeu, fonction récursive

//________________Gestion des transitions des dieux_________________________

// ### Première transition avec Xavier 
var dieu1=document.getElementById("dieu1");
dieu1.addEventListener("click",affichexav);

var xav= document.getElementById("transition_xav");
function affichexav(){
  xav.style.visibility="visible";
  dieu1.style.visibility="hidden"
}
bouton_xav.onclick=function(){
  xav.style.visibility="hidden";
}

// ### Deuxième transition avec Victor
var dieu2=document.getElementById("dieu2");
dieu2.addEventListener("click",affichevictor);

var victor= document.getElementById("transition_victor");
function affichevictor(){
  victor.style.visibility="visible";
  dieu2.style.visibility="hidden"
}
bouton_victor.onclick=function(){
  victor.style.visibility="hidden";
}

//______________________ Images à afficher dans l'inventaire _____________

var icone1=document.getElementById("objet2");
var icone2=document.getElementById("objet3");
var icone3=document.getElementById("objet4");
var icone4=document.getElementById("objet5");


//--------------------//
//   Jeu             //
//------------------//

var victoire=false; // boolean utile car le jeu est non linéaire
var k=0; // compteur pour les objets de l'inventaire

function f(objet){

    var nb_click=0;
  
  objet.addEventListener('click',e=>{

    if (victoire){
      // en cas de victoire
      width=100;
      progression(width);

      var chaine=remplace(document.getElementById('popup_content').innerHTML);
      document.getElementById('popup_content').innerHTML=chaine;
      console.log(chaine);
      console.log("victoire");
      console.log(indice);
      
      bouton_terminer.onclick=function(){
        console.log("bouton_terminer");
        score=$chrono.innerText;
        ajout(pseudo,score);

        var racine=document.location.origin;
        var path=document.location.pathname.replace('carte','fin');
        var info=document.location.search.concat('&score='+score);
        var new_url=racine+path+info;
        console.log(new_url);
        setTimeout(function(){
          document.location.replace(new_url);
        },800); 

      }
      
    }
    else{
      if (nb_click==0){
        width+=10;
        progression(width);
        nb_click=1
      

        // appel de l'objet suivant
        fetch('../php/objet.php?id='+indice)
      .then(result => result.json())
      .then(result => {
  
           // l'objet est retiré de la carte, c'est l'objet de l'inventaire qui prend sa place
           inventaire.push(objet);
           objet.remove(cartodyssee);
  
           var n=inventaire.length-1;
           inventaire[n].addTo(cartodyssee);
           inventaire[n].openPopup();
           
           
           controle_zoom(inventaire[n]);
           
           // L'objet de l'inventaire est supprimé quand on clique sur l'objet suivant
           if (n>1){
             console.log(inventaire[n-1]);
             inventaire[n-1].remove(cartodyssee);
           }
  
           //gestion de l'instruction
           var inst=marqueur(result)[3];
           console.log(inst);
           document.getElementById("instruction_jeu").innerHTML=inst;
  
            
            temporaire=marqueur(result)[0];
            indice=marqueur(result)[1];
            fonctionnalite=marqueur(result)[2];
            console.log(fonctionnalite);
            console.log(indice);
            
            // Différentes fonctionnalité à voir dans la base de données 

            if (fonctionnalite=='normal'){

              // Gestion de l'affichage dans l'inventaire
              k+=1
              if (k==1){
                icone1.style.visibility="visible";
              }
              else if (k==4){
                icone3.style.visibility="visible";
              }
  

              temporaire.addTo(cartodyssee);
              controle_zoom(temporaire);
            }
            else if(fonctionnalite=='question'){

              // questionnaire, valable pour deux objets

              console.log("Valeur de n"+n)
              questionnaire(inventaire[n],n);
              inventaire[n].on('click',e=>{console.log('titi');
                try{questionnaire(inventaire[n],n);}
                catch{console.log('pas def')}
            });
              
            }
            else if(fonctionnalite=='glisser'){
              // glisser déposé du kangoo

              glisser(inventaire[n]);
              inventaire[n].on('click',e=>{console.log('titi');
                try{glisser(inventaire[n]);}
                catch{console.log('pas def')}
            });
            }
  
            else if(fonctionnalite=='cliquerinventaire'){
              // clique dans l'inventaire de Malika
              
              cliquer_inventaire(inventaire[n]);
              inventaire[n].on('click',e=>{console.log('titi');
                try{cliquer_inventaire();}
                catch{console.log('pas def')}
              });
            }
  
            else if (fonctionnalite=='retourIthaque'){
              // dernière étape
  
              temporaire.addTo(cartodyssee);
              controle_zoom(temporaire);
              victoire=true;
            }
              
            
            
            console.log(inventaire);
            f(temporaire);
            
        });
      }
      
      else if (nb_click==1){
        console.log("Aller chercher l'objet suivant.")
        
      }
    }
  });
}

//----------------------------------------------------------//
//   Fonctions annexes utilisées dans les fonctionnalités  //
//--------------------------------------------------------//

function cliquer_inventaire(objet){
  //fonction qui passe à l'étape suivante lors du click sur le diagramme uml présent dans l'inventaire
  var malika_uml=document.getElementById("objet4");
  var chaine=remplace(document.getElementById('popup_content').innerHTML);
  document.getElementById('popup_content').innerHTML=chaine;
  n_click=0;
  malika_uml.addEventListener('click',e=>{
    n_click+=1;
    if (n_click==1){
      document.getElementById("popup_content").innerHTML+="<br><br>Ton diagramme UML est magnifique <br><img  src='../media/uml.png' height=10% width=10%> <br> Avant de rentrer, passe donc faire la fête avec Emmanuel sur l'île de Kithira.<br>"
      temporaire.addTo(cartodyssee);
      controle_zoom(temporaire);
    }
    
  });
}



function questionnaire(objet,n){
  // fonction qui gère les deux questionnaires, celui d'Hervé Quiquenel et celui de Fritsch
  if (n==6){
    bouton_herve.onclick=function(){

      // Ajout de la carte donnée par Hervé dans l'inventaire
      icone4.style.visibility="visible";

      let verification= document.getElementById('coord_herve').value;
      console.log(verification);

      //  (verification != "(20.6735,38.4196)" || verification !="(38.4196,20.6735)"){
        
      
      if (verification =="(20.6735,38.4196)"){

        cartodyssee.setView([21.05403130115909, 38.48412669947911],10)
        dieu1.style.visibility="visible";

        temporaire.addTo(cartodyssee);
        controle_zoom(temporaire);
      }
      else if(verification == "(38.4196,20.6735)"){
       
        // Possibilité de gagner rapidement le jeu
        cartodyssee.setView([38.48412669947911, 20.95403130115909],9)
        fetch('../php/objet.php?id=10')
        .then(result => result.json())
        .then(result => {
          penelope=marqueur(result)[0];
          penelope.addTo(cartodyssee);
          victoire=true;
          f(penelope);
          console.log(result);
        });
    }
    else{
      console.log("echec");
      document.getElementById("faux").innerHTML="Essaye encore!"
    }


    }
  }
  else if(n==8){
    bouton_fritsch.onclick=function(){
      let verification= document.getElementById('requete').value;
      console.log(verification);

      if (verification == "VACUUM ANALYZE"){
        objet.getPopup().setContent('<p id="popup_content">Bravo! Tu peux rentrer tout doucement vers Ithaque maintenant</p>');

        setTimeout(function(){
          temporaire.addTo(cartodyssee);
          controle_zoom(temporaire);
          cartodyssee.setView([34.8491032280052,24.081354098749564],10)
          dieu2.style.visibility="visible";
        },3000);
        
      }
      else{
        console.log("Mauvaise réponse");
        document.getElementById("faux").innerHTML="Essaye encore!"
      }
    } 
  }
}

function glisser(objet){
  // fonction qui gère le questionnaire et le glisser-déposer du kangoo
  temporaire.addTo(cartodyssee);
  controle_zoom(temporaire);

  var marseille = L.rectangle([[43.307122066033, 5.347865569694506], [43.278884491766064, 5.378960085855232]], {
    color: "red",
    fillOpacity: 0.6
  });
  var limites = L.latLngBounds([[43.307122066033, 5.325865569694506], [43.28687360198575, 5.346586014093818]]);

  bouton_v.onclick=function(){

    let verification= document.getElementById('pseudo_kangoo').value;
    console.log(verification);


    if (verification =="1geo2geo3geometres"){

      icone2.style.visibility="visible";
      marseille.addTo(cartodyssee);

      objet.getPopup().setContent("<p id='popup_content'>Bravo, glisse le Kangoo jusqu'au port de Marseille maintenant</p>");

      objet.on('dragend',e=>{

        if (marseille.getBounds().contains(objet.getLatLng())){
    
          objet.getPopup().setContent("<p id='popup_content'>Bravo vous êtes arrivés à Marseille<br><button id='bouton_marseille' class='bouton'>Prendre la mer</button></p>");
          objet.openPopup();

          var overlay = L.imageOverlay( '../media/bateaumarseille.png', limites, {
            opacity: 1
          });

          marseille.remove(cartodyssee);
          overlay.addTo(cartodyssee);
          cartodyssee.fitBounds([[43.307122066033, 5.347865569694506], [43.278884491766064, 5.378960085855232]]);
          
          bouton_marseille.onclick=function(){

            temporaire.addTo(cartodyssee);

            controle_zoom(temporaire);
            temporaire.openPopup();
            cartodyssee.setView([28.21724408197127, -16.425868488500043],15);
            console.log('succès');
            
          }; 

          objet.on('click',e=>{
            bouton_marseille.onclick=function(){

              temporaire.addTo(cartodyssee);
  
              controle_zoom(temporaire);
              temporaire.openPopup();
              cartodyssee.setView([28.21724408197127, -16.425868488500043],15);
              console.log('succès');
              
            };
          }); 
        }

        else{
          
          point_arrive=marseille.getBounds().getCenter();
          point_kangoo=objet.getLatLng();
          var dist = distance(point_kangoo,point_arrive);
          objet.getPopup().setContent("<p id=popup_content>Tu es encore à "+dist+" km de Marseille</p>");
          objet.openPopup();

        }
      });
    }
    else{
      console.log("Mauvaise réponse");
      document.getElementById("faux").innerHTML="Essaye encore!"
    }

  };

}


//__________________________________________________________________________________________________
//                               Autres fonctions et outils
//__________________________________________________________________________________________________



// ________ Fonction pour incrémenter la barre de progression ________ //


function progression(width) {
  //change le style pour changer la marge
  var elem = document.getElementById("progression");
  elem.style.width = width + '%';
  elem.innerHTML = width * 1 + '%';
}


// ________ Gestion des indices de l'inventaire ________ //

indice1=document.getElementById('objet2')
var sauvegarde1 = indice1.innerHTML;

indice2=document.getElementById('objet3')
var sauvegarde2 = indice2.innerHTML;

indice3=document.getElementById('objet4')
var sauvegarde3 = indice3.innerHTML;

indice4=document.getElementById('objet5')
var sauvegarde4 = indice4.innerHTML;



indice1.addEventListener('click',e=>{
  indice1.innerHTML="<p class='indices'>Fallait écouter les cours de Serge</p>";
  setTimeout(function() {
    indice1.innerHTML=sauvegarde1;
  },700);
});

indice2.addEventListener('click',e=>{
  indice2.innerHTML="<p class='indices'>Le Teide est un volcan des Canaries</p>";
  setTimeout(function() {
    indice2.innerHTML=sauvegarde2;
  },700);
});

indice3.addEventListener('click',e=>{
  indice3.innerHTML="<p class='indices'>Clique sur ce diagramme si tu es avec Malika</p>";
  setTimeout(function() {
    indice3.innerHTML=sauvegarde3;
  },700);
});

indice4.addEventListener('click',e=>{
  indice4.innerHTML="<p class='indices'>Cythère est une île entre la Grèce et la Crète</p>";
  setTimeout(function() {
    indice4.innerHTML=sauvegarde4;
  },700);
});