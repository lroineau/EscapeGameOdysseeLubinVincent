<?php
// Insère un élément dans la BD
include('connect.php');

$sql = "INSERT INTO joueur (pseudo,score) VALUES ('$_POST[pseudo]','$_POST[score]')";

if (mysqli_query($link, $sql)) {
      echo "Nouveau enregistrement créé avec succès";
} else {
      echo "Erreur : " . $sql . "<br>" . mysqli_error($link);
}
mysqli_close($link);
?>
