# L'Escape Game Odyssée

Ramener Ulysse à Ithaque !

<img src="media/logo.png" height="60px" width="auto"/>

## Pour commencer

Bienvenu dans L'Escape Game Odyssée ! Suivez attentivement les instructions d'installation ci-dessus.

### Pré-requis

Plusieurs éléments sont nécessaires au fonctionnement du jeu

- Avoir installé un serveur web local ([MAMP](https://www.mamp.info/en/downloads/) ou [Wamp](https://www.wampserver.com/)), et l'avoir lancé
- Avoir installé un navigateur web (Chrome ou Firefox)
- Le jeu nécessite une connexion internet pour l'affichage de la carte (si vous n'êtes pas connecté, le fond des popups sera rouge)

Ce jeu est conçu pour marcher sur plusieurs taille d'écran, mais pour une meilleure expérience, il est recommandé de jouer sur un écran d'ordinateur.

### Installation

Voici les différentes étapes de l'installation du programme :

- Sur Git, télécharger en zip _(Code -> Download ZIP)_
- Placer le dossier EscapeGameOdysseeVincentLubin à la racine de votre répertoire localhost (pour MAMP, vérifier l'adresse dans les préférences, pour Wamp, placer le fichier dans ``C:\wamp64\www``)
- Dans votre navigateur internet entrer ``localhost/phpMyAdmin``. Si vous n'avez jamais changé la configuration, l'user est root, sans mot de passe. 
- Cliquer sur nouvelle base de donnée, appeler la odyssee.
- Cliquer sur importer, puis choisir le fichier BD_Odyssee.sql présent dans le répertoire. Choisir utf-8.
- ATTENTION Si vous avez changé la configuration de phpMyAdmin, entrez vos identifiants habituels, mais cela nécessite la modification du code du jeu suivante :\
Ouvrir le fichier **objet.php** (``EscapeGameOdysseeVincentLubin\php\connect.php``) à l'aide d'un éditeur de texte, et modifier dans la 2ème ligne root par votre username, et entrer votre mot-de-passe dans les '' vide.\
_$link = mysqli_connect('localhost', '**votre user**', '**votre mdp**', 'odyssee');_

- Le jeu est prêt à être lancé !

## Démarrage

Pour lancer le jeu, taper dans votre navigateur ``localhost/EscapeGameOdysseeVincentLubin``. Une fois sur la page d'accueil, cliquer simplement sur jouer. Bon jeu ! 

## Fabriqué avec

Les logiciels et ressources suivantes ont été utilisés pour le développement du projet :

* [Visual Studio Code](https://visualstudio.microsoft.com/fr/) - Editeur de code
* [MAMP](https://www.mamp.info/en/downloads/) - Serveur Web local
* [Wamp](https://www.wampserver.com/) - Serveur Web local
* [StackOverflow](https://stackoverflow.com/) - Aide pour le développement 

## Versions

Version finale, datant du 28 novembre 2021

## Auteurs

* **Vincent Heau** [VincentHeau](https://github.com/VincentHeau)
* **Lubin Roineau** [lroineau](https://github.com/lroineau)
