<?php
/*$usuario = "root";
$contrasena = "";
$servidor = "localhost";
$basededatos = "Aura";*/
$usuario = "uaura";
$contrasena = "U4ur@123";
$servidor = "localhost";
$basededatos = "dbwpress";

$conexion = mysqli_connect($servidor, $usuario, $contrasena) or die("No se ha podido conectar al servidor de Base de datos");

$db = mysqli_select_db($conexion, $basededatos) or die("No se ha podido establecer conexion con la bd");
if($conexion&&$db){
	echo "La conexion tuvo éxito";
}
mysqli_set_charset($conexion,"utf8");
?>
