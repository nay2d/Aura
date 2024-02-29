<?php
include("conexion.php");
echo $_POST["ubicacionAutoarchivoOtro"];
$nomnreRevista = $_POST["nombreRevista"];
$urlRevista = mysqli_real_escape_string($conexion,$_POST['urlRevista']);
$institucion = $_POST["institucion"];
$tipoEditorial = $_POST["tipoEditorial"];
$organoExpresion = $_POST["organoExpresion"];
$issnImpreso = $_POST["issnImpreso"];
$issnElectronico = $_POST["issnElectronico"];
$acceso = $_POST["acceso"];
$mesesEmbargo = $_POST["mesesEmbargo"];
$categoriaRevista = $_POST["categoriaRevista"];
$derechosExplotacion = $_POST["derechosExplotacion"];
$titularDerechos = $_POST["titularDerechos"];
$ubicacionMencionDerechos = $_POST["ubicacionMencionDerechos"];
$urlMencionDerechos = $_POST["urlMencionDerechos"];
$licenciaPublicacion = $_POST["licenciaPublicacion"];
$licenciaPublicacionOtro = $_POST["licenciaPublicacionOtro"];
$urlTipoPublicacion = $_POST["urlTipoPublicacion"];
$urlInstruccionAutor = $_POST["urlInstruccionAutor"];
$licenciaContenido = $_POST["licenciaContenido"];
if(isset($_POST["versionAutoarchivo"])){
$versionAutoarchivo = $_POST["versionAutoarchivo"];
}else{
	$versionAutoarchivo=null;
}
if(isset($_POST["versionAutoarchivo1"])){
$versionAutoarchivo1 = $_POST["versionAutoarchivo1"];
}else{
	$versionAutoarchivo1=null;
}
$autoarchivoMomento = $_POST["autoarchivoMomento"];
$ubicacionAutoarchivo = $_POST["ubicacionAutoarchivo"];
$ubicacionAutoarchivoOtro = $_POST["ubicacionAutoarchivoOtro"];
$colorRomeo = $_POST["colorRomeo"];
$indizaciones = $_POST["indizaciones"];
$nombreCargoUsu = $_POST["nombreCargoUsu"];
$telefonoUsu = $_POST["telefonoUsu"];
$emailUsu = $_POST["emailUsu"];

if($versionAutoarchivo == "on" && $versionAutoarchivo1 == "on"){
	$versionAutoarchivo= "Pre-print (versión sin evaluar), Post-print (versión editorial), Post-print (versión editorial)";
}else if($versionAutoarchivo == "on"){
	$versionAutoarchivo= "Pre-print (versión sin evaluar), Post-print (versión editorial)";
}else if($versionAutoarchivo1 == "on"){
	$versionAutoarchivo= "Post-print (versión editorial)";
}
$pais = $_POST["pais"];
//echo ("estos son los datos--->". $nomnreRevista.$urlRevista.$institucion.$tipoEditorial.$organoExpresion.$issnImpreso.$issnElectronico.$acceso.$mesesEmbargo.$categoriaRevista.$derechosExplotacion.$titularDerechos.$ubicacionMencionDerechos.$urlMencionDerechos.$licenciaPublicacion.$urlTipoPublicacion.$urlInstruccionAutor.$licenciaContenido.$versionAutoarchivo.$autoarchivoMomento.$ubicacionAutoarchivo.$colorRomeo.$indizaciones.$nombreCargoUsu.$telefonoUsu.$emailUsu);

$sql = "INSERT INTO `FormAura`(`nomRevista`, `urlRevista`, `nomInstitucion`, `tipoEditorial`, `pais`, `organo`, `issnImpreso`, `issnElectronico`, `acceso`, `mesesEmbargo`, `categoriaRevista`, `derechosExplotacion`, `titularDerechos`, `ubicacionMencionDerechos`, `urlMencionDerechos`, `licenciaPublicacion`, `licenciaPublicacionOtro` , `urlTipoPublicacion`, `urlInstruccionAutor`, `licenciaContenido`, `versionAutoarchivo`, `autoarchivoMomento`, `ubicacionAutoarchivo`, `ubicacionAutoarchivoOtro` , `colorRomeo`, `indizaciones`, `nombreCargoUsu`, `telefonoUsu`, `emailUsu`, `fechaRegistro`) VALUES (\"".$nomnreRevista."\",\"".$urlRevista."\",\"".$institucion."\",\"".$tipoEditorial."\",\"".$pais."\",\"".$organoExpresion."\",\"".$issnImpreso."\",\"".$issnElectronico."\",\"".$acceso."\",\"".$mesesEmbargo."\",\"".$categoriaRevista."\",\"".$derechosExplotacion."\",\"".$titularDerechos."\",\"".$ubicacionMencionDerechos."\",\"".$urlMencionDerechos."\",\"".$licenciaPublicacion."\",\"".$licenciaPublicacionOtro."\",\"".$urlTipoPublicacion."\",\"".$urlInstruccionAutor."\",\"".$licenciaContenido."\",\"".$versionAutoarchivo."\",\"".$autoarchivoMomento."\",\"".$ubicacionAutoarchivo."\",\"".$ubicacionAutoarchivoOtro."\",\"".$colorRomeo."\",\"".$indizaciones."\",\"".$nombreCargoUsu."\",\"".$telefonoUsu."\",\"".$emailUsu."\",NOW())";
//echo "<br>";
//echo "datos a insertar<br><br>";
//echo $sql;

echo "<br><br>";
if (mysqli_query($conexion, $sql)) {
      echo "New record created successfully";
      echo('
<head>
		<ui:insert name="superior"></ui:insert>
		<ui:insert name="titulo"></ui:insert>
		<link rel="shortcut icon" href="/resources/img/imgPortal/minisearch.png"/>
		<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
 		<style>
		.swal-button-container { 
			font-size: 12pt; 
		} 
 		</style> 
	</head>');
echo('
	<body>
	<script type="text/javascript">
		swal({
 			  title: "Estimado usuario:",
 			  text: "Los datos se han guardado correctamente.",
 			  icon: "success",
 			  showCancelButton: false,
  			  showConfirmButton: true
  			  }).then(function() {
    		  window.location = "https://aura.amelica.org/";
			  });
		</script>				
		</body>');
} else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
      echo('
		<head>
			<link rel="shortcut icon" href="/resources/img/imgPortal/minisearch.png"/>
			<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	 		<style>
			.swal-button-container { 
				font-size: 12pt; 
			} 
	 		</style> 
		</head>');
echo('
	<body>
	<script type="text/javascript">
		swal({
 			  title: "Estimado usuario:",
 			  text: "Los datos no se han guardado correctamente, por favor intente de nuevo.",
 			  icon: "error",
 			  showCancelButton: false,
  			  showConfirmButton: true
  			  }).then(function() {
    		  window.history.back();
			  });
		</script>				
		</body>');
}
mysqli_close($conexion);
?>