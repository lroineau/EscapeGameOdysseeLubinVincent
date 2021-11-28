<?php
// récupère les objets de la BD et retour JSON
include("connect.php");

$results = [];

$requete = "SELECT * FROM objet;";
$result = mysqli_query($link,$requete);


if ($result = mysqli_query($link, $requete)) {
  while ($ligne = mysqli_fetch_assoc($result)) {
        array_push($results, [
            "id" => intval($ligne['id']),
            "nom" => $ligne['nom'],
            "lat"=>floatval($ligne['lat']),
            "lng"=>floatval($ligne['lng']),
            "icone"=>$ligne['icone'],
            "taillex"=>floatval($ligne['taille_icone_x']),
            "tailley"=>floatval($ligne['taille_icone_y']),
            "minZoom"=>floatval($ligne['minZoom']),
            "maxZoom"=>floatval($ligne['maxZoom']),
            "draggable"=>floatval($ligne['draggable']),
            "BLOQUE"=>floatval($ligne['BLOQUE']),
            "popup"=>$ligne['popup'],
            "FONCTION"=>$ligne['FONCTION'],
            "INSTRUCTION"=>$ligne['INSTRUCTION']
            
        ]);
  }
} else {
  echo "Erreur de requête de base de données.";
}



if (isset($_GET['id'])) {
    echo json_encode($results[$_GET['id']-1]);
    
}
else{
  echo json_encode([$results[0],$results[1]]);

}

 ?>
