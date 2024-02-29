<?php 
//echo json_encode(array('success' => 0));
$issn = $_POST['issn'];

$servidor = "localhost";
$usuario = "uaura";
$contrasena = "U4ur@123";
$basededatos = "dbwpress";
$conexion = mysqli_connect($servidor, $usuario, $contrasena) or die("No se ha podido conectar al servidor de Base de datos");
$db = mysqli_select_db($conexion, $basededatos) or die("No se ha podido establecer conexion con la bd");

$sql= "SELECT issnImpreso FROM FormAura WHERE issnImpreso = \"".$issn."\"";

	$datos = mysqli_query($conexion, $sql);

	$regreso = mysqli_fetch_array($datos);
if(mysqli_num_rows($datos)>0){
	echo json_encode(array('success' => 1, 'issn'=>$regreso));
}else{
	echo json_encode(array('success' => 0, 'issn'=>$regreso));
}
?>