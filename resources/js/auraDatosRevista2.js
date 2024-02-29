var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);


app.controller("auraController", function ($scope, $http, $location) {
    
    const servidor = server;
    const idiomaJson = cargarJson;

    console.log('Datos Revitsa Aura');
    $scope.cveRevista = getParametroURL('cveRevista');
    console.log('datos');

     /** Idioma **/
     $scope.idioma;
     console.log('idiomaRecuperado ' + localStorage.getItem('idioma'));
     var idiomaRecuperado = localStorage.getItem('idioma');
     if (idiomaRecuperado !== null) {
         $scope.idioma = idiomaRecuperado;
         console.log('idiomaLocalStorage: ' + $scope.idioma);
         //formulario
     } else {
         $scope.idioma = "es";
         console.log('idiomaDefault: ' + $scope.idioma);
     }

     $scope.traducir = function (idioma) {
        $https({
            method: 'GET',
            url: idiomaJson+idioma+'.json'
        }).then(function (data) {
            $scope.t = data.data;
            console.log(data);
            console.log('traduccion');
            console.log($scope.t);
        }, function (error) {
            console.log("Error al cargar archivo Traducción");
        });
    }

     //formulario
    console.log("scopeIdioma-->" + $scope.idioma);
    if ($scope.idioma == 'en') {
        $scope.traducir('idiomaEn');
        console.log("entro al if Formulario");
    } if ($scope.idioma == 'es') {
        $scope.traducir('idiomaEs');
        console.log("entro al if Formulario");
    }
 
     $scope.myFunc = function (idioma) {
         $scope.idioma = idioma;
         console.log('prueba' + idioma);
         localStorage.setItem('idioma', idioma);
         console.log('guardoIdiomaLocalStorage--> ' + localStorage.getItem('idioma'));
         //$scope.colorIdioma(idioma);
         if (idioma == 'en') {
             $scope.traducir('idiomaEn');
         } if (idioma == 'es') {
             $scope.traducir('idiomaEs');
         }
     };

    $scope.cargarDatos = function () {
        $https({
            method: 'post',
            url: servidor+'/service/csgAura/getRevistasPorClave/'+$scope.cveRevista//,'getRevistaCve.php'
            //data: { cveRevista: $scope.cveRevista }
        }).then(function successCallback(response) {
            $scope.datosRevistas = response.data;
            console.log($scope.datosRevistas);
            console.log('objeto');
            //asociacion form(campo)=Json(Revista.campo)
            $scope.nomRevista = $scope.datosRevistas['nombreRevista'];//['nomRevista'];
            $scope.cvePais = $scope.datosRevistas['clavePais']; //['cvePais']
            $scope.searchText = $scope.datosRevistas['nombreInstitucion'];//['nomInstitucion']
            //esliban
            if(!isValidData($scope.datosRevistas['nombreInstitucion']))
                $scope.nomInstitucion = $scope.datosRevistas['nombreInstitucion'];//['nomInstitucion']
            else
                $scope.nomInstitucion = $scope.datosRevistas['nombreOtraInstitucion'];
            $scope.titularDerechos = $scope.datosRevistas['titularDerecho']//['titularDerechos'];
            $scope.issnElectronico = $scope.datosRevistas['issnTipoElectronico'];//['issnElectronico']
            $scope.issnImpreso = $scope.datosRevistas['issnTipoImpreso'];//['issnImpreso']
            $scope.issnL = $scope.datosRevistas['issnTipoL'];//['issnL']
            $scope.urlRevista = $scope.datosRevistas['urlRevista'];//['urlRevista']
            //crear un case para asignar la categoría de revista
            //$scope.nomCategoria = $scope.datosRevistas['claveCategoriaRevista'];//['nomCategoria']
            $scope.obtenerCategoria($scope.datosRevistas['claveCategoriaRevista']);//['nomCategoria']
            $scope.acceso = $scope.datosRevistas['tipoAcceso'];//['acceso']
            $scope.mesesEmbargo = $scope.datosRevistas['mesesDeEmbargo'];//['mesesEmbargo']
           
            if($scope.mesesEmbargo >= "1") {
                 $scope.mesesEmbargo='Sí'
            }else
            if ($scope.mesesEmbargo === "0" || $scope.mesesEmbargo === null || $scope.mesesEmbargo === ""){
                 $scope.mesesEmbargo='No'
            }

            $scope.derechosExplotacion = $scope.datosRevistas['derechoExplotacion'];//['derechosExplotacion']
            $scope.ubicacionMencionDerechos = $scope.datosRevistas['ubicacionCopyrigth'];//ubicacionMencionDerechos
            $scope.urlMencionDerechos = $scope.datosRevistas['urlMencionCopyrigth'];//['urlMencionDerechos']
            $scope.licenciaPublicacion = $scope.datosRevistas['nombreLicenciaPublicacion'];//['licenciaPublicacion']
            $scope.urlInstruccionAutor = $scope.datosRevistas['urlInstruccionDelAutor'];//['urlInstruccionAutor']
            $scope.autoArchivo = $scope.datosRevistas['opcionAutoArchivo'];//['autoArchivo']
            $scope.versionAutoarchivo = $scope.datosRevistas['versionDelAutoArchivo'];//['versionAutoarchivo']
            $scope.autoarchivoMomento = $scope.datosRevistas['autoArchivoDelMomento'];//['autoarchivoMomento']
            $scope.ubicacionAutoarchivo = $scope.datosRevistas['ubicacionDelAutoArchivo'];//['ubicacionAutoarchivo']
            $scope.colorRomeo = $scope.datosRevistas['colorDeRomeo'];//['colorRomeo']

            switch($scope.colorRomeo) {
                case 'Azul':
                    $scope.color_romeo={
                        color:"#0C0B0B",
                        backgroundColor:'#cce5ff'
                    }
                    break;
                case 'Verde':
                    $scope.color_romeo={
                        color:"#0C0B0B",
                        backgroundColor:'#d4edda'
                    }
                    break;
                case 'Amarillo':
                    $scope.color_romeo={
                       color:"#0C0B0B",
                       backgroundColor:'#fff3cd'
                     }
                     break;
                case 'Blanca':
                    $scope.color_romeo={
                       color:"#0C0B0B",
                       backgroundColor:'#f5f5f5'
                     }
                     break;
                default:
                    $scope.color_romeo={
                        color:"#0C0B0B",
                        backgroundColor:'#f5f5f5'
    
                    }
            }
            //en caso de no mostrar indizaciones o categoría: aplicar reglas desde el backend
            //$scope.textoIndizacion = $scope.datosRevistas['indizacionExtendida'];//['indizacionesExtendido']
            $scope.obtenerIndizaciones($scope.datosRevistas['indizacionExtendida']);//['indizacionesExtendido']
            $scope.cargoResponsable = $scope.datosRevistas['cargoDelContacto'];//['cargoContacto']
            //$scope.cveCategoria = $scope.datosRevistas['claveCategoriaRevista'];//['cveCategoria']
            $scope.editorial = $scope.datosRevistas['tipoDeEditorial'];//['tipoEditorial']
        });

    }
    //obtener indizaciones
    //$scope.textoIndizacion='';
    $scope.obtenerIndizaciones = function (indizacion) {
        $https({
            method: 'post',
            url: servidor+'/service/csgAura/getRevistaIndezadaEn/'+$scope.cveRevista//'getIndizadaen.php'
            //data: { cveRevista: $scope.cveRevista }
        }).then(function successCallback(response) {
            $scope.datosIndizaciones = response.data;
            console.log($scope.datosIndizaciones);
            //mostrar indizaciones (no normalizadas + normalizadas) v1
            /*$scope.ultimo= $scope.datosIndizaciones.length ;
            for (var i = 0; i < $scope.datosIndizaciones.length; i++) {
                console.log($scope.datosIndizaciones[i]);//...nes[i][0]
                if($scope.textoIndizacion === '' || $scope.textoIndizacion===null){
                    $scope.textoIndizacion = $scope.datosIndizaciones[i][1];//nes[i][0] (nomentinx)
                }else{
                    $scope.textoIndizacion = $scope.textoIndizacion + ', '+$scope.datosIndizaciones[i][1];//nes[i][0] (nomentinx)
                }
            }*/
            //mostrar indizaciones: Prioridad= Datos Normalizados. sí no existe= datos no normalizados v2
            if($scope.datosIndizaciones.length>0){
                $scope.textoIndizacion='';
                for (var i = 0; i < $scope.datosIndizaciones.length; i++)
                    $scope.textoIndizacion += $scope.datosIndizaciones[i][1]+', ';//nes[i][0] (nomentinx)
                //quitar coma del útimo string
                $scope.textoIndizacion = $scope.textoIndizacion.slice(0,-2);
            }else
                $scope.textoIndizacion= indizacion;
        });
    }

    //obtener categoria db
    $scope.obtenerCategoria = function (clave) {
        $https({
            method: 'GET',
            url: servidor+'/service/csgAura/getCatRevista'
        }).then(function (response) {
            $scope.categoriasArray = response.data;
            for (let index = 0; index < $scope.categoriasArray.length; index++) {
                if($scope.categoriasArray[index][0] === clave){//===$scope.claveCategoriaRevista
                    $scope.nomCategoria = $scope.categoriasArray[index][1];
                    break;
                }
            }
        });
    }
});

function getParametroURL(parametro) {
    var parametros = window.parent.location.search.substring(1).split('&');

    for (var i = 0; i < parametros.length; i++) {
        if (parametros[i].indexOf(parametro + '=') != -1) {
            return decodeURI(parametros[i].split('=')[1]);
        }
    }
    return "";
}

function isValidData(val){
    return angular.isUndefined(val) || val === null || val.length==0
}