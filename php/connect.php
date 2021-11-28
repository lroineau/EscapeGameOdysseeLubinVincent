<?php
$link = mysqli_connect('localhost', 'root', '','odyssee');
// Si vous avez un mot de passe et un nom d'utilisateur
//$link = mysqli_connect('localhost', 'utlisateur', 'mot de passe','odyssee');

mysqli_set_charset($link,"utf8");
if (!$link) {
  die('Erreur de connexion');
} 

?>
