-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : Dim 28 nov. 2021 à 21:28
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `odyssee`
--

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

DROP TABLE IF EXISTS `joueur`;
CREATE TABLE IF NOT EXISTS `joueur` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pseudo` char(20) NOT NULL,
  `score` time NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `joueur`
--

INSERT INTO `joueur` (`id`, `pseudo`, `score`) VALUES
(27, 'Poire', '01:51:00'),
(28, 'Myrtille', '02:12:00'),
(30, 'Invite', '02:37:00'),
(31, 'Madeleine', '15:15:00'),
(32, 'Pamplemousse', '11:18:00'),
(33, 'Prune', '11:18:00'),
(34, 'Invite', '02:14:00'),
(36, 'Lubin', '01:14:00'),
(37, 'Vincent', '01:19:00');

-- --------------------------------------------------------

--
-- Structure de la table `objet`
--

DROP TABLE IF EXISTS `objet`;
CREATE TABLE IF NOT EXISTS `objet` (
  `id` int(20) DEFAULT NULL,
  `nom` text NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `icone` text NOT NULL,
  `taille_icone_x` int(11) NOT NULL,
  `taille_icone_y` int(11) NOT NULL,
  `minZoom` int(11) NOT NULL,
  `maxZoom` int(11) NOT NULL,
  `draggable` tinyint(1) NOT NULL,
  `popup` text NOT NULL,
  `BLOQUE` int(11) NOT NULL,
  `FONCTION` text NOT NULL,
  `INSTRUCTION` text NOT NULL,
  UNIQUE KEY `BTREE` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `objet`
--

INSERT INTO `objet` (`id`, `nom`, `lat`, `lng`, `icone`, `taille_icone_x`, `taille_icone_y`, `minZoom`, `maxZoom`, `draggable`, `popup`, `BLOQUE`, `FONCTION`, `INSTRUCTION`) VALUES
(1, 'Ulysse', 45.85432319234684, -1.2320735475735336, 'ulysse.png', 60, 120, 15, 18, 0, '<p id=popup_content>Je suis très fatigué ! Sois gentil, va me chercher le <u>rameur géodesique de Serge Botton</u>, je crois qu\'il l\'a deposé au nord de l\'île d\'Oléron.<br>Sois attentif aux messages des dieux, et regarde bien les objets que tu récupères, ils ont peut-être des indices pour la suite. En cas de doute, demande à Coco, mon phénix, il t\'aidera comme il le peut. Et ne fait pas attention à sa tête, il a eu une semaine difficile !<br>Je t\'emmenerai visiter Ithaque avec moi !\r\n </p><button id=\'bouton_commencer\' class=\'bouton_pop\'>Commencer l\'Odyssée</button>', 0, '', 'Débuter l\'aventure en allant chercher le rameur géodésique au nord de l\'île d\'Oléron.'),
(2, 'Rameur', 46.04049486007216, -1.4042254048875902, 'rameur.png', 110, 70, 15, 18, 0, '<p id=popup_content>Salut Ulysse, c\'est Serge ! Tu n\'auras mon aviron que si tu visites le monument qui a servi de point fondamental pour la NTF. Bon courage !\r\n</p>', 3, 'normal', ''),
(3, 'Croix', 48.84631707378805, 2.3464674485607575, 'pantheon.png', 120, 120, 10, 18, 0, '<p id=popup_content>Bien joué ! Tant que tu es sur Paris, passe donc voir Patricia dans son bureau, elle a une surprise pour toi ! \r\n</p>', 11, 'normal', 'Aller visiter le Panthéon à Paris'),
(4, 'Kangoo', 45.85604418285923, -1.2292087931202706, 'kangoo.png', 100, 70, 8, 18, 1, '<p id=\"popup_content\"><label>Code Chauffeur <input type=\"text\" id=\"pseudo_kangoo\" name=\"pseudo_kangoo\"></label></p><p id=\'faux\'></p><button id=\"bouton_v\" class=\"bouton_pop\">Valider</button>', 12, 'normal', 'Entrer le code chauffeur pour débloquer le kangoo'),
(5, 'Herve Quinquenel', 28.272326025206844, -16.642509040965628, 'herve.png', 70, 70, 10, 18, 0, '<p id=\"popup_content\">Bonjour Ulysse, voici les coordonnées pour rentrer directement à Ithaque, tu as juste à les rentrer ci-dessous pour retrouver ta belle Pénélope. Bon voyage !<br> <br> <u>Coordonnées d\'Ithaque :</u> \"(20.6735,38.4196)\"<br><br><label>Coordonnées :      <input type=\"text\" id=\"coord_herve\" name=\"coord_herve\"></label><br><br><img src=\"../media/carte.png\" height=\'20%\' width=\'20%\'></p>\r\n<p id=\'faux\'></p><button id=\"bouton_herve\" class=\"bouton_pop\">Valider</button><br>', 7, 'normal', 'Retrouver Hervé au sommet du Teide'),
(6, 'Emmanuel Fritsch', 31.208139364989954, 29.91778359571495, 'fritsch.png', 70, 70, 8, 18, 0, '<p id=popup_content> La base de donnée des vents est lourde et nécessite l\'utilisation d\'un index spatial.\r\nMais la simple création de cet index n\'est pas suffisante, il faut le nettoyer. \r\nPar contre c\'est à toi d\'aller chercher cette commande dans la documentation.\r\nTape la ci-dessous si tu veux débloquer la BDVENTS. <em>Attention, je veux seulement la commande.</em><br> <br>\r\n<label>Commande SQL : <input type=\"text\" id=\"requete\" name=\"requete\"></label>\r\n<br><br><button id=\"bouton_fritsch\" class=\"bouton_pop\">Valider</button></p>\r\n<a href=\"http://www.postgis.fr/chrome/site/docs/workshop-foss4g/doc/indexing.html\" target=\"_blank\">Documentation de l\'Index Spatial</a>', 8, 'normal', 'Retrouver Fritsch à Alexandrie'),
(7, 'Olivier Gueguen', 20.673504261148263, 38.41968526089526, 'gueguen.png', 70, 70, 8, 18, 0, '<p id=popup_content>Alors comme ça tu as inversé latitude et longitude ! Il n\'y a pas un poil de vent par ici, et ça fait longtemps que ça dure. <br>Je répare des câbles depuis quelques jours ici. Bon courage si tu dois rentrer à Ithaque.<br> Ah mais tu peux aussi passer à Alexandrie, je crois qu\'Emmanuel est en vacances là-bas, et il sait peut-être pourquoi la Base de Donnée des Vents ne se charge pas !</p>', 6, 'question', 'Entrer les coordonnées d\'Ithaque'),
(8, 'Malika', 34.8491032280052, 24.081354098749564, 'malika.png', 70, 70, 8, 18, 0, '<p id=popup_content>Tu vas pouvoir me créer un beau diagramme UML.<br> $pseudo$ !!<br> Si tu as une question tu me la poses!</p>', 9, 'question', 'S\'échapper de l\'île de Malika'),
(9, 'Emmanuel Cledat', 36.22983343046056, 23.000185934218557, 'cledat.png', 70, 70, 10, 18, 0, '<p id=popup_content>Bienvenu Ulysse ! J\'ai entendu parler des tes récentes aventures. Viens donc, tu pourras tout me raconter en détail, et nous ferons une fête en ton honneur pour célébrer ton retour prochain à Ithaque. Bon retour !</p>', 10, 'cliquerinventaire', 'Allez faire la fête avec Clédat sur l\'île de Kithira'),
(10, 'Penelope', 38.41968526089526, 20.673504261148263, 'penelope.png', 120, 140, 10, 18, 0, '<p id=popup_content> Bravo $pseudo$, merci de m\'avoir ramené mon Ulysse. J\'espère qu\'il a été bien sage ! \r\n\r\n<br> <br><button id=\"bouton_terminer\" class=\"bouton\">Terminer</button></p>', 0, 'retourIthaque', 'Retrouver Penelope sur Ithaque'),
(11, 'Patricia', 48.840749957054804, 2.58773084351553, 'patricia.png', 70, 70, 10, 18, 0, '<p id=popup_content>Tu peux utiliser le Kangoo de l\'IGN. Antoine l\'a magnifiquement garé sur l\'île d\'Oléron. Le code chauffeur est\r\njuste en dessous.\r\nIl faut que vous soyez deux dans le kangoo ! Et faites attention en conduisant !<br><br>\r\n<u>Code chauffeur :  </u>1geo2geo3geometres</p>', 4, 'normal', 'Retrouver Patricia à son bureau'),
(12, 'UML', 28.207724408197127, -16.425868488500043, 'uml.png', 70, 70, 8, 18, 0, '<p id=popup_content>Après une violente tempête, vous venez de vous échouer sur une plage des Canaries. Sur la plage, vous découvrez un parchemin dans lequel figure un diagramme UML. Conscient de l\'importance de ce diagramme, vous conseillez à Ulysse de le garder précieusement. <u>Cliquez sur le diagramme pour l\'ajouter à l\'inventaire.</u> <br>Mais sans carte et sans repère, il est difficile de poursuivre l\'aventure... Heureusement pour vous, il y a Hervé dans les environs. Allez donc le voir au sommet du Teide, il pourra vous aider.<br>Quelle chance qu\'il ait décidé de faire une CO aux Canaries!</p>', 5, 'glisser', 'Déplacer le kangoo jusqu\'au Port de Marseille ');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
