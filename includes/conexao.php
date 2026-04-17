<?php
$host = "localhost";
$user = "u199367788_LsFZZ8kXv_admin"; 
$pass = "Bqnepc154762!";
$dbname = "u199367788_LsFZZ8kXv_BDpontoID";

$conn = mysqli_connect($host, $user, $pass, $dbname);

if (!$conn) {
    die("Falha na conexão: " . mysqli_connect_error());
}
?>