<?php
//récupère les joueurs de la BD
include("connect.php");

$results = [];

$requete = "SELECT * FROM joueur ORDER BY score asc;";
$result = mysqli_query($link,$requete);

if ($result = mysqli_query($link, $requete)) {
  while ($ligne = mysqli_fetch_assoc($result)) {
        array_push($results, [
            "id" => intval($ligne['id']),
            "pseudo" => $ligne['pseudo'],
            "score"=>$ligne['score'],
            ]);
  }
} else {
  echo "Erreur de requête de base de données.";
}

echo json_encode($results);

 ?>
