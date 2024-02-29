<?php 
//echo json_encode(array('success' => 0));
$issnE = $_POST['issnE'];

$servidor = "localhost";
$usuario = "uaura";
$contrasena = "U4ur@123";
$basededatos = "dbwpress";
$conexion = mysqli_connect($servidor, $usuario, $contrasena) or die("No se ha podido conectar al servidor de Base de datos");
$db = mysqli_select_db($conexion, $basededatos) or die("No se ha podido establecer conexion con la bd");

$sql= "SELECT issnElectronico FROM FormAura WHERE issnElectronico = \"".$issnE."\"";

	$datos = mysqli_query($conexion, $sql);

	$regreso = mysqli_fetch_array($datos);
if(mysqli_num_rows($datos)>0){
	echo json_encode(array('success' => 1, 'issnE'=>$regreso));
}else{
	echo json_encode(array('success' => 0, 'issnE'=>$regreso));
}
?>