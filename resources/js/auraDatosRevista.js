var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);


app.controller("auraController", function ($scope, $http, $window, $location) {
    
    const servidor = server;
    
    console.log('Datos Revitsa Aura');
    $scope.cveRevista = getParametroURL('cveRevista');
    $scope.cargarDatos = function () {
        $https({
            method: 'post',
            url: servidor+'/service/csgAura/getRevistasPorClave/'+$scope.cveRevista//'../getRevistaCve.php'
            //data: { cveRevista: $scope.cveRevista }
        }).then(function successCallback(response) {
            $scope.datosRevistas = response.data;
            //console.log($scope.datosRevistas);
            $scope.cveInstitucion = $scope.datosRevistas['claveIntitucion'];//['cveInstitucion']
            //$scope.nomRevista = $scope.datosRevistas['nombreRevista'];//['nomRevista']
            $scope.nombreRevista = $scope.datosRevistas['nombreRevista'];//['nomRevista']
            $scope.urlRevista = $scope.datosRevistas['urlRevista'];//['urlRevista']
            $scope.pais = $scope.datosRevistas['clavePais']; //['cvePais']
            //$scope.pais = $scope.paises[$scope.datosRevistas['clavePais']]; //['cvePais']
            $scope.searchText = $scope.datosRevistas['nombreInstitucion'];//['nomInstitucion']
            $scope.tipoEditorial = $scope.datosRevistas['tipoDeEditorial'];//['tipoEditorial']
            $scope.organoExpresion = $scope.datosRevistas['nombreOrgano'];
            $scope.issnImpreso = $scope.datosRevistas['issnTipoImpreso'];
            $scope.issnElectronico = $scope.datosRevistas['issnTipoElectronico'];
            $scope.issnL = $scope.datosRevistas['issnTipoL'];
            $scope.acceso = $scope.datosRevistas['tipoAcceso'];
            $scope.mesesEmbargo = parseInt($scope.datosRevistas['mesesDeEmbargo']);
            $scope.cveCategoria = $scope.datosRevistas['claveCategoriaRevista'];//['cveCategoria']
            $scope.derechosExplotacion = $scope.datosRevistas['derechoExplotacion'];
            $scope.titularDerechos = $scope.datosRevistas['titularDerecho'];
            $scope.ubicacionMencionDerechos = $scope.datosRevistas['ubicacionCopyrigth'];
            $scope.urlMencionDerechos = $scope.datosRevistas['urlMencionCopyrigth'];
            $scope.licenciaPublicacion = $scope.licencia($scope.datosRevistas['nombreLicenciaPublicacion']);//['licenciaPublicacion']
            $scope.urlTipoPublicacion = $scope.datosRevistas['urlTiposLicencia'];
            $scope.urlInstruccionAutor = $scope.datosRevistas['urlInstruccionDelAutor'];
            $scope.colorRomeo = $scope.datosRevistas['colorDeRomeo'];
            $scope.cargoResponsable = $scope.datosRevistas['cargoDelContacto'];//['cargoContacto']
            $scope.editorial = $scope.datosRevistas['tipoDeEditorial'];//['tipoEditorial']
            $scope.indizacionesExtendido = $scope.datosRevistas['indizacionExtendida'];//['indizacionesExtendido']
            $scope.valAutoarchivo = $scope.datosRevistas['ubicacionDelAutoArchivo'];//['ubicacionAutoarchivo']
            $scope.nombreResponsable = $scope.datosRevistas['nombreDelContacto'];
            $scope.cargoResponsable = $scope.datosRevistas['cargoDelContacto'];
            $scope.telefonoResponsable = $scope.datosRevistas['telefonoUsuario'];
            $scope.emailResponsable = $scope.datosRevistas['emailUsuario'];
            $scope.autoArchivo1 = $scope.datosRevistas['opcionAutoArchivo'];
            $scope.autoArchivo = {"name":"0"};
            //$scope.ocultarAutoArchivo();
            $scope.Fuente = $scope.datosRevistas['decripcionFuente'];//['Fuente']
            if ($scope.Fuente != null && $scope.Fuente != '') {//comparacion ||
                $scope.FuenteA = $scope.datosRevistas['decripcionFuente'].split(', ');
                console.log($scope.FuenteA);
                for (i = 0; i < $scope.FuenteA.length; i++) {
                    valor2 = $scope.FuenteA[i];
                    console.log(valor2);
                    if (valor2 === 'Redalyc') {
                        $scope.RevRedalyc = true;
                    }
                    if (valor2 === 'AmeliCA') {//Ameli
                        $scope.RevAmeli = true;
                    }
                }
            }

            //$scope.validarRevista = $scope.datosRevistas['estadoValidada'];//['Validada']
            $scope.validarRevista=false;
            if ($scope.datosRevistas['estadoValidada'] == '1')//$scope.validarRevista
                $scope.validarRevista = true;
            $scope.cveAmeli = $scope.datosRevistas['claveAmeli'];//['cverevameli']
            $scope.cveRedalyc = $scope.datosRevistas['claveRedalyc'];//['cverevredalyc']
            $scope.Validada = $scope.datosRevistas['estadoValidada'];//['Validada']

            //console.log('otraInstitucion->' + $scope.datosRevistas['nombreOtraInstitucion']);//['otraInstitucion']

            if ($scope.datosRevistas['nombreOtraInstitucion'] === '' || $scope.datosRevistas['nombreOtraInstitucion'] === null) {//['otrainstitucion']
                $scope.otrainstitucionMostrar = false;
                console.log('otraInstitucionMostrar->'+$scope.otrainstitucionMostrar);
                jQuery('#otroNombreInstitucion').prop('required', false);
                jQuery('#institucion').prop('required', true);
            } else {
                $scope.otrainstitucionMostrar = true;
                $scope.otroNombreInstitucion = $scope.datosRevistas['nombreOtraInstitucion'];
                jQuery('#otroNombreInstitucion').prop('required', true);
                jQuery('#institucion').prop('required', false);
            }

            if ($scope.licenciaPublicacion === 'Otro') {
                $scope.mostrarLicenciaPublicacionOtro = true;
                $scope.licenciaPublicacionOtro = $scope.datosRevistas['nombreLicenciaPublicacion'];////['licenciaPublicacion']
            }
            
            /*if ($scope.datosRevistas['versionDelAutoArchivo'] === 'Pre-print (versión sin evaluar), Post-print (versión editorial)') {//['versionAutoarchivo']
                $scope.autoArchivo = {
                    name: 'Pre-print (versión sin evaluar), Post-print (versión editorial)'
                };
                $scope.pruba = 'Pre-print (versión sin evaluar), Post-print (versión editorial)';
                $scope.opcionesAutoArchivo1();
            } if ($scope.datosRevistas['versionDelAutoArchivo'] === 'Post-print (versión editorial)') {
                $scope.autoArchivo = {
                    name: 'Post-print (versión editorial)'
                };
                $scope.pruba = 'Post-print (versión editorial)';
                $scope.opcionesAutoArchivo2();
            }*/

            $scope.autoarchivoDonde = $scope.datosRevistas['ubicacionDelAutoArchivo'];//['ubicacionAutoarchivo']
            jQuery('#inputOtro').hide();
            if ($scope.datosRevistas['ubicacionDelAutoArchivo'] != null && $scope.datosRevistas['ubicacionDelAutoArchivo'] != '') {// || !=''
                $scope.autoArchivoDondeA = $scope.datosRevistas['ubicacionDelAutoArchivo'].split(', ');
                //console.log($scope.autoArchivoDondeA);
                // console.log($scope.autoArchivoDondeA.length);

                for (i = 0; i < $scope.autoArchivoDondeA.length; i++) {
                    valor2 = $scope.autoArchivoDondeA[i];
                    //console.log('wero'+valor2);
                    if (valor2 === 'Repositorio institucional') {
                        $scope.repositorioI = true;
                        //jQuery('#inputOtro').hide();
                    }
                    if (valor2 === 'Repositorio temático') {
                        $scope.repositorioT = true;
                        //jQuery('#inputOtro').hide();
                    }
                    if (valor2 === 'Web personal') {
                        $scope.web = true;
                        //jQuery('#inputOtro').hide();
                    }
                    if (valor2 != 'Repositorio institucional' && valor2 != 'Repositorio temático' && valor2 != 'Web personal' && valor2 !='') {
                        $scope.autoArchivoOtro = true;
                        $scope.autoArchivoDondeOtro = true;
                        $scope.autoArchivoDondeOtrotxt = $scope.autoArchivoDondeA[i];
                        console.log('muestro otro');
                        jQuery('#inputOtro').show();
                        //jQuery('#inputOtro').show();
                    }
                }
            }


            $scope.autoarchivoMomento = $scope.datosRevistas['autoArchivoDelMomento'];//['autoarchivoMomento']
            if ($scope.datosRevistas['autoArchivoDelMomento'] != null && $scope.datosRevistas['autoArchivoDelMomento'] != '') {// if.. || ..)
                $scope.autoarchivoMomentoA = $scope.datosRevistas['autoArchivoDelMomento'].split(', ');
                // console.log($scope.autoarchivoMomento);
                // console.log($scope.autoarchivoMomentoA.length);

                for (i = 0; i < $scope.autoarchivoMomentoA.length; i++) {
                    valor2 = $scope.autoarchivoMomentoA[i];
                    console.log(valor2);
                    if (valor2 === 'Al envío') {
                        $scope.checkMomentoAutoArchivo1 = true;
                    }
                    if (valor2 === 'A la aceptación del trabajo') {
                        $scope.checkMomentoAutoArchivo2 = true;
                    }
                    if (valor2 === 'En el momento de la publicación') {
                        $scope.checkMomentoAutoArchivo3 = true;
                    }
                    if (valor2 === 'Después de un periodo de embargo') {
                        $scope.checkMomentoAutoArchivo4 = true;
                    }
                }
            }
            $scope.ocultarAutoArchivo();
            if ($scope.datosRevistas['versionDelAutoArchivo'] === 'Pre-print (versión sin evaluar), Post-print (versión editorial)') {//['versionAutoarchivo']
                $scope.autoArchivo = {
                    name: 'Pre-print (versión sin evaluar), Post-print (versión editorial)'
                };
                $scope.pruba = 'Pre-print (versión sin evaluar), Post-print (versión editorial)';
                $scope.opcionesAutoArchivo1();
            } if ($scope.datosRevistas['versionDelAutoArchivo'] === 'Post-print (versión editorial)') {
                $scope.autoArchivo = {
                    name: 'Post-print (versión editorial)'
                };
                $scope.pruba = 'Post-print (versión editorial)';
                $scope.opcionesAutoArchivo2();
            }
            $scope.obtenerCargo();
        });

    }

    $scope.prueba = function () {
        console.log('borro datos');
        $scope.searchText = '';
        $scope.cveInstitucion = '';
        console.log($scope.pais+' <- pais');
    }

    $scope.autoArchivoOtroF = function () {
        if ($scope.autoArchivoOtro) {
            $scope.autoArchivoOtro = false;
            $scope.autoArchivoDondeOtrotxt = '';
        } else {
            $scope.autoArchivoOtro = true;
        }
        // console.log('valor check: ' + $scope.autoArchivoOtro);
        //console.log($scope.autoArchivoOtro);
    }

    $scope.licencia = function (licencia) {
        switch (licencia) {
            case 'Atribución - CC BY':
                text = "Atribución - CC BY";
                break;
            case 'Atribución-No Comercial - CC BY-NC':
                text = "Atribución-No Comercial - CC BY-NC";
                break;
            case 'Atribución-Compartir Igual - CC BY-SA':
                text = "Atribución-Compartir Igual - CC BY-SA";
                break;
            case 'Atribución-Sin Derivadas - CC BY-ND':
                text = "Atribución-Sin Derivadas - CC BY-ND";
                break;
            case 'Atribución-No Comercial-Compartir Igual - CC BY-NC-SA':
                text = "Atribución-No Comercial-Compartir Igual - CC BY-NC-SA";
                break;
            case 'Atribución-No Comercial-Sin Derivadas - CC BY-NC-ND':
                text = "Atribución-No Comercial-Sin Derivadas - CC BY-NC-ND";
                break;
            case 'Ninguna':
                text = "Ninguna";
                break;
            default:
                text = "Otro";
        }
        return text;
    }

    $scope.mostrarLicenciaPublicacionOtro = false;
    $scope.licenciaPublicacionV = function ($event) {
        if ($scope.licenciaPublicacion === 'Otro') {
            $scope.mostrarLicenciaPublicacionOtro = true;
        } else {
            $scope.mostrarLicenciaPublicacionOtro = false;
        }
        //console.log('valor categoria: ' + $scope.licenciaPublicacion);
        //console.log($scope.mostrarLicenciaPublicacionOtro);
    }

    //mostrar campos otro institución
    $scope.mostrarOtro = function ($event) {
        $scope.searchText = '';
        $scope.cveInstitucion = '';
        jQuery('#institucion').prop('required', false);
    }

    //carga Paises desde la DB
    $scope.obtenerPaises = function () {
        $https({
            method:'GET',
            url:servidor+'/service/csgAura/getPaises'//'../getPais.php'
        }).then(function (response) {
            $scope.paises = response.data;
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }

    //obtener categoria db
    $scope.obtenerCategoria = function () {
        $https({
            method: 'GET',
            url: servidor+'/service/csgAura/getCatRevista'//'../getCategoria.php'
        }).then(function (response) {
            $scope.categorias = response.data;
        });
    }
    //obtener cargos
    $scope.obtenerCargo = function () {
        $scope.cargos = 'Administración,Apoyo académico,Apoyo editorial,Apoyo secretarial,Apoyo técnico,Asesor,Asesor técnico,Asistente de producción,Asistente editorial,Codirector,Coeditor,Coeditor Internacional,Comisión consultiva,Comité académico,Comité asesor,Comité científico,Comité Científico y Editorial,Comité de redacción,Comité editorial,Comité ejecutivo,Comité ético,Comité técnico,Consejo asesor,Consejo científico,Consejo Científico Internacional,Consejo Científico Nacional,Consejo de redacciónConsejo directivo,Consejo editorial,Consejo editorial consultivo,Consejo Editorial Internacional,Consejo Editorial Nacional,Consejo honorario,Consejo técnico,Consultor,Coordinación de comité editorial,Coordinador,Coordinador editorial,Corrección de abstracts,Corrección filológica,Corrector de estilo,Corrector de prueba,Corrector editorial,Cuerpo Editorial Científico,Cuidado de la edición impresa,Diagramación,Director,Director adjunto,Director asociado,Director científico,Director colegiado,Director editorial,Director ejecutivo,Director emérito,Director fundador,Director honorario,Diseñador,Diseñador web,Diseño y desarrollo de página web,Diseño y producción,Distribución,Docente Pre-Grado - Ex-Decano,Edición,Edición electrónica,Editor,Editor académico,Editor adjunto,Editor asociado,Editor científico,Editor de distribución,Editor de formato,Editor de la versión electrónica,Editor de redacción,Editor de sección,Editor delegado,Editor ejecutivo,Editor emérito,Editor en jefe,Editor general,Editor honorario,Editor técnico,Editor temático,Equipo editorial,Evaluador,Formación,Fotografía,Fundador,Gerente editorial,Gestión editorial,Maquetación,Mesa de redacción,Montaje,No se conoce,Presidente,Presidente de comité editorial,Presidente de consejo asesor,Presidente de consejo de redacción,Presidente del Consejo editorial,Presidente honorario,Producción editorial,Redacción,Representante legal,Responsable editorial,Secretario,Secretario de redacción,Secretario técnico,Soporte informático,Subdirector,Subeditor,Traductor,Vicepresidente,Vicesecretario,Vocal,Webmaster'.split(',');
        for(i=0;i<$scope.cargos.length;i++){
            if(!$scope.cargos.includes( $scope.cargoResponsable )){
                console.log('agrego el cargo->'+$scope.cargoResponsable);
                $scope.cargos.push($scope.cargoResponsable);
            }
        }
    }

    //instituciones
    $scope.fetchUsers = function () {
        if(!isUndefinedOrNull($scope.searchText)){
            var searchText_len = $scope.searchText.trim().length;
            // Check search text length
            if (searchText_len > 3) {
                $https({
                    method: 'get',
                    url: servidor+'/service/csgAura/getInstitucion/'+$scope.pais+'/'+$scope.searchText//'../getInstitucion.php'
                    //data: { searchText: $scope.searchText, 'pais_id': $scope.cvePais }
                }).then(function successCallback(response) {
                    $scope.searchResult = response.data;
                });
            } else {
                $scope.searchResult = {};
            }
        }
    }

    // Set value to search box
    $scope.cveInstitucion;
    $scope.setValue = function (index, $event) {
        $scope.searchText = $scope.searchResult[index][1];//[index].nomentint
        $scope.cveInstitucion = $scope.searchResult[index][0];//[index].cveentint
        //angular.element($('#cveInstitucion')).val($scope.searchResult[index][0]);//[index].cveentint
        $scope.searchResult = {};
        $event.stopPropagation();
    }

    $scope.searchboxClicked = function ($event) {
        //$scope.searchText = null; ver verificacion
        //$scope.cveInstitucion=-1;
        $event.stopPropagation();
    }

    $scope.containerClicked = function () {
        $scope.searchResult = {};
    }

    //obtener indizaciones
    $scope.obtenerIndizaciones = function () {
        $https({
            method: 'post',
            url: servidor+'/service/csgAura/getRevistaIndezadaEn/'+$scope.cveRevista
            //data: { cveRevista: $scope.cveRevista }
        }).then(function successCallback(response) {
            //response.data[[cveentinx][nomentinx][cverevind]] -> traer el Objeto en Json
            var listOfIndizacion = [];
            for(let i=0; i<response.data.length; i++){
                var arraynew = { cverevind: response.data[i][2], 
                                cveRevista: $scope.cveRevista, 
                                cveIndizacion: $scope.addCve, 
                                cveentinx: response.data[i][0], 
                                nomentinx: response.data[i][1] };
                listOfIndizacion.push(arraynew);
            }
            //almacena las indizaciones normalizadas (existentes) para poder borrar "delete(JsonIndizacion)"
            $scope.datosIndizaciones = listOfIndizacion;
            //$scope.productsCve2 = response.data[0];
            //$scope.datosIndizaciones = response.data;
        });
    }

    $scope.getIndizacionesRevista = function(){
        if(isUndefinedOrNull($scope.indizacionesExtendido))
            $scope.indizacionesExtendido="";
    }

    $scope.removeItemDB = function (x, callback) {
        swal({
            title: "¿Esta seguro?",
            text: "La indización sera elminada de la base de datos",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    console.log('devuelvo' + true);
                    return true;
                } else {
                    return false;
                }
            });
    }

    $scope.elimiarIndizaciones = function (rIndizacion) {//cverevind
        $https({
            method: 'post',
            url: servidor+'/service/csgAura/deleteRevista',// 'deleteRevistaIndizacion.php'
            data: rIndizacion//cveRevista: cverevind
        }).then(function successCallback(response) {
            console.log(response.data);
        //en caso de error al eliminar, refresca las indizaciones
        }, function errorCallback(response) {
            console.log(response.status)
            alert('Error al eliminar indización');
            //$window.location.href = '../validacion/datosRevista3.html?cveRevista='+$scope.cveRevista;
            //eliminar la lista de indizacion "Nueva" (mejorar)
            $scope.clearIndizacion();
            //refresca las indizaciones de DB
            $scope.obtenerIndizaciones();
        });
    }

    //object x, cveIndizacion, index(ListItemIndizacion n)
    $scope.removeUser = function (x, cveIndizacion, index) {
        var revistaIndizacion={
            "claveIndizacionRevistaId" : x.cverevind,
            "claveRevista": $scope.cveRevista,
            "claveIndizacion": x.cveentinx
        };
        //Object x e x=[cverevind,cveentinx(claveRevista),nomentinx(nombreRevista)]
        //console.log('x='+x.cveentinx, 'cveIndizacion='+ cveIndizacion, 'index='+index)
        if (confirm("¿Esta seguro?, La indización sera elminada de la base de datos")) {
            //alert("deleted"+ x);
            console.log('x->' + Object.values(x));
            if (cveIndizacion === '') {
                $scope.removeItem(index, cveIndizacion);
            } else {
                $scope.elimiarIndizaciones(revistaIndizacion);//cveIndizacion
                $scope.datosIndizaciones.splice(index, 1);
            }
        }
    }

    //indizaciones
    //$scope.datosIndizaciones = [];
    $scope.productsCve = [];
    //claves de cada indizacion
    $scope.productsCve2;
    $scope.addItem = function ($event) {
        if(!isValidData($scope.addText)){
            console.log('aqui we->'+$scope.addText)
            if(isUndefinedOrNull($scope.datosIndizaciones))
                $scope.datosIndizaciones=[];
            var arraynew = { cverevind: "", cveRevista: $scope.cveRevista, cveIndizacion: $scope.addCve, cveentinx: $scope.addCve, nomentinx: $scope.addText };
            $scope.datosIndizaciones.push(arraynew);
            console.log('add-> '+arraynew);
            console.log($scope.datosIndizaciones);
            $scope.productsCve.push($scope.addCve);
            $scope.productsCve2 = $scope.productsCve.toString();
            console.log($scope.productsCve2);
            $scope.addText = '';
            $scope.searchText1 = '';
            $event.stopPropagation();
        }
    }
    $scope.removeItem = function (x, cveIndizacion) {
        console.log('borrar datos');
        console.log(Object.values(x));
        $scope.datosIndizaciones.splice(x, 1);
        console.log($scope.productsCve);
        $scope.productsCve.splice(cveIndizacion, 1);
        console.log($scope.productsCve);
        $scope.productsCve2 = $scope.productsCve.toString();
        console.log('productos2->' + $scope.productsCve2);
    }

    //refrescar la lista de indizacion "Nueva"
    $scope.clearIndizacion = function(){
        $scope.productsCve2 = [];
        $scope.productsCve = [];
        $scope.datosIndizaciones=[];
    }
    //busca indizaciones de una "barra de busqueda"
    $scope.buscarIndizaciones = function () {
        console.log("holas");
        if(!isUndefinedOrNull($scope.searchText1)){
            var searchText_len = $scope.searchText1.trim().length;
            // Check search text length
            if (searchText_len > 3) {
                $https({
                    method: 'post',
                    url: servidor+'/service/csgAura/getIndizacion/'+$scope.searchText1//'../getIndizaciones.php'
                    //data: { searchText: $scope.searchText1, 'country_id': $scope.country }
                }).then(function successCallback(response) {
                    $scope.searchResult1 = response.data;
                    console.log($scope.searchResult1);
                });
            } else {
                $scope.searchResult = {};
            }
        }
    }

    // Set value to search box
    $scope.setValue1 = function (index, $event) {
        $scope.searchText1 = $scope.searchResult1[index][1];//$scope.searchResult1[index].nomentinx
        $scope.addText = $scope.searchResult1[index][1];//$scope.searchResult1[index].nomentinx
        $scope.addCve = $scope.searchResult1[index][0];//$scope.searchResult1[index].cveentinx
        $scope.searchResult1 = {};
        $event.stopPropagation();
    }

    $scope.searchboxClicked1 = function ($event) {
        $event.stopPropagation();
    }

    $scope.containerClicked1 = function () {
        $scope.searchResult1 = {};
    }

    //*************  actualizar Revista ******************
    $scope.actualizarDatos = function(){
        //validaciion del form y elegir una institucion 
        if(document.getElementById("formAuraUpdate").value){
            if(confirm("¿Esta seguro?, Los datos serán actualizados")){
                //construcción del json (Revista)
                if($scope.otrainstitucionMostrar){
                    $scope.searchText='';
                    $scope.cveInstitucion='';
                    $scope.otroNombreInstitucion = document.getElementById('otroNombreInstitucion').value;
                }else{
                    $scope.otroNombreInstitucion="";
                }

                if($scope.mostrarLicenciaPublicacionOtro){
                    $scope.licenciaPublicacion = document.getElementById('licenciaPublicacionOtro').value;
                }
                var estatusValidacion='0';
                if($scope.validarRevista)
                    estatusValidacion = '1';

                if(isUndefinedOrNull($scope.productsCve2))
                    $scope.productsCve2='';

                if(isUndefinedOrNull($scope.indizacionesExtendido))
                    $scope.indizacionesExtendido='';

                var jsonDataRevista = {
                    "claveRevista": $scope.cveRevista,
                    "nombreRevista" : $scope.nombreRevista,
                    "urlRevista" : $scope.urlRevista,
                    "clavePais" : $scope.pais,
                    //"nombreInstitucion" : $scope.searchText,
                    "claveIntitucion": $scope.cveInstitucion,
                    "tipoDeEditorial": $scope.tipoEditorial,
                    "nombreOrgano": $scope.organoExpresion,
                    "issnTipoImpreso": $scope.issnImpreso,
                    "issnTipoElectronico": $scope.issnElectronico,
                    "issnTipoL": $scope.issnL,
                    "tipoAcceso": $scope.acceso,
                    "mesesDeEmbargo": $scope.mesesEmbargo,
                    "claveCategoriaRevista": $scope.cveCategoria,
                    "derechoExplotacion": $scope.derechosExplotacion,
                    "titularDerecho": $scope.titularDerechos,
                    "ubicacionCopyrigth": $scope.ubicacionMencionDerechos,
                    "urlMencionCopyrigth": $scope.urlMencionDerechos,
                    "nombreLicenciaPublicacion": $scope.licenciaPublicacion,
                    "urlTiposLicencia": $scope.urlTipoPublicacion,
                    "urlInstruccionDelAutor": $scope.urlInstruccionAutor,
                    "opcionAutoArchivo": $scope.autoArchivo1,
                    "versionDelAutoArchivo": document.getElementById('versionAutoarchivoV').value,
                    "autoArchivoDelMomento": document.getElementById('autoarchivoMomento').value,
                    "ubicacionDelAutoArchivo": document.getElementById('autoarchivoDonde').value,
                    "colorDeRomeo": $scope.colorRomeo,
                    "indizacionExtendida": $scope.productsCve2,//indizacion Normalizada
                    "nombreDelContacto": $scope.nombreResponsable,
                    "cargoDelContacto": $scope.cargoResponsable,
                    "telefonoUsuario": $scope.telefonoResponsable,
                    "emailUsuario": $scope.emailResponsable,
                    //"fechaDeRegistro":"",//set in service
                    "decripcionFuente": document.getElementById('fuente').value,
                    "estadoValidada": estatusValidacion,
                    "nombreOtraInstitucion": $scope.otroNombreInstitucion,//nombreOtraInstitucion,
                    "claveAmeli": $scope.cveAmeli,
                    "claveRedalyc": $scope.cveRedalyc,
                    "fechaUltimaActualizacion":"",//set in service
                    //cambiar esto
                    //"nombreInstitucion":"indizacion" no normalizada
                    "nombreInstitucion" : $scope.indizacionesExtendido
                };
                console.log(jsonDataRevista);
                $https.post(
                    servidor+'/service/csgAura/updateRevista',//datosPagina
                    jsonDataRevista
                ).then(function successCallback(response) {
                    alert('Modificación Realizada');
                    $('#formAuraUpdate').val(false);
                    $window.location.href = '../validacion/';
                }, function errorCallback(response) {
                    console.log(response.status)
                    if(response.status == 500)
                        alert('Error en el servidor');
                    else
                        alert('Error, Intente de nuevo');
                    $window.location.href = '../validacion/';
                });
            }
        }
    }

    //********** validación para el auto-archivo ***************
    $scope.mostrarAutoarchivo = true;
    $scope.opcionesAa1 = true;
    $scope.opcionesAa2 = true;
    $scope.ocultarAutoArchivo = function () {
        //auto-archivo="No"; deshabilitar items
        if($scope.autoArchivo1 == "No"){
            console.log('opcion-> No');
            $scope.mostrarAutoarchivo = true;
            $scope.opcionesAa1 = true;
            $scope.opcionesAa2 = true;
            //resetear los valores auto-archivo(pre,post)
            $scope.autoArchivo.name = "0";
            //$('#versionDelAutoArchivo').val("");
            $scope.limpiarItems();
        }else{
            //habilitar items con estas etiquetas (auto-archivo != No)
            $scope.mostrarAutoarchivo = false;
            $scope.opcionesAa1 = false;
            $scope.opcionesAa2 = false;
        }
    }

    $scope.opcionesAutoArchivo1 = function(){
        $scope.opcionesAa2 = false;
        $scope.opcionesAa1 = true;
        //limpiar 4to
        $scope.autoArchivoOp4 = "0";
    }

    $scope.opcionesAutoArchivo2 = function(){
        $scope.opcionesAa1 = false;
        $scope.opcionesAa2 = true;
        //limpiar 1,2 do
        $scope.autoArchivoOp1 = "0";
        $scope.autoArchivoOp2 = "0";
    }

    $scope.limpiarItems = function(){
        $scope.autoArchivoOp1 = "0";
        $scope.autoArchivoOp2 = "0";
        $scope.autoArchivoOp3 = "0";
        $scope.autoArchivoOp4 = "0";
        $scope.web = "0";
        $scope.repositorioI = "0";
        $scope.repositorioT = "0";
        $scope.autoArchivoOtro = "0";
        //$scope.autoArchivoOtroF();
        //$scope.inputOtro = true;
        $('#inputOtro').hide();
        $('#versionAutoarchivoV').val("");
        $('#autoarchivoMomento').val("");
        $('#autoarchivoDonde').val("");
        /*$('#autoarchivoMomento').val("");
        $('#autoArchivoDondeOtro').val("");
        $('#autoarchivoDonde').val("");
        $scope.autoArchivoOtro();
        $scope.autoAchivoDondeOtro = false;*/
    }
});

//https://stackoverflow.com/questions/17910192/undefined-or-null-for-angularjs

function getParametroURL(parametro) {
    var parametros = window.parent.location.search.substring(1).split('&');
    for (var i = 0; i < parametros.length; i++) {
        if (parametros[i].indexOf(parametro + '=') != -1) {
            return decodeURI(parametros[i].split('=')[1]);
        }
    }
    return "";
}

$(document).ready(function () {

    cveRevista = getParametroURL('cveRevista');
    $issn_group = $(".checkIssn");
    console.log('validar issn2');
    //console.log($issn_group);
    $issn_group.prop('required', true);
    $('.checkIssn').blur(function () {
        console.log('validar');
        console.log($(this).attr("id"));
        console.log($(this).val().length);
        if ($(this).val().length > 0) {
            $issn_group.prop('required', false);
        } else {
            $issn_group.prop('required', true);
        }
        validarIssn($(this).val(), $(this).attr("id"));

    });

    function validarIssn(issn, id) {
        console.log('datos-> ' + issn + ' ' + id);

        if (issn.length > 0) {
            if (issn.length !== 9) {
                console.log('valor invalido -->' + issn);
                $('#' + id).addClass('is-invalid');
            } else {
                console.log('dato bueno');
                $('#' + id).removeClass('is-invalid');
                $('#' + id).addClass('is-valid');
                if (issn.indexOf("-") != -1) {
                    console.log("Si tiene -");
                    console.log('posicion--->' + issn.charAt(4));
                    if (issn.charAt(4) === "-") {
                        console.log('posicion correcta');
                        $('#' + id).removeClass('is-invalid');
                        $('#' + id).addClass('is-valid');
                    } else {
                        console.log('posicion invalida');
                        $('#' + id).addClass('is-invalid');
                    }
                } else {
                    console.log('no tiene -');
                    $('#' + id).addClass('is-invalid');
                }
            }
            $.ajax({
                type: "POST",
                url: server +'/service/csgAura/getIssn2/'+id+'/'+issn+'/'+cveRevista,//''../getIssn2.php''
                //data: { issn: issn, tabla: id, cveRevista: cveRevista },
                success: function (response) {
                    response = JSON.parse(response);
                    console.log(response);
                    //validación, sí no exciste, regresa un campo vacio
                     //if (response === false) {
                    if (response == "") {
                        console.log('isss no existe');
                    } else {
                        console.log('issn ya registrado');
                        //alert('El issn ingresado ya esta registrado');
                        swal({
                            title: "Estimado usuario:",
                            text: "ISSN ya registrado",
                            icon: "error",
                            showCancelButton: false,
                            showConfirmButton: true
                        }).then(function () {
                            $('#' + id).val('');
                            $('#' + id).addClass('is-invalid');
                            //window.location = "http://148.215.24.37/proyectoAura/aura/incluir-revista.html";
                        });
                    }
                }
            });
        }
    }

    //crea cadena de valores separados por coma
    $('[name="checks[]"]').click(function () {
        var arr = $('[name="checks[]"]:checked').map(function () {
            return this.value;
        }).get();
        var str = arr.join(', ');
        $('#arr').text(JSON.stringify(arr));
        $('#str').text(str);
        $('#autoarchivoMomento').val(str);
    });
    // auto-archivoCuando
    $('[name="checksAutoarchivoDonde[]"]').click(function () {
        $('#autoarchivoDonde').val();
        var arr = $('[name="checksAutoarchivoDonde[]"]:checked').map(function () {
            console.log(this.value);
            return this.value;
        }).get();
        console.log(arr);
        var str = arr.join(', ');
        $('#arr').text(JSON.stringify(arr));
        $('#str1').text(str);
        $('#autoarchivoDonde').val(str);
        if ($('#autoArchivoDondeOtro').val() != undefined) {
            $('#autoarchivoDonde').val(str + ', ' + $('#autoArchivoDondeOtro').val());
        }
    });

    $("#autoAchivoDondeOp4").click(function () {
        console.log('cambio');
        leerCheck();
    });

    $(".otroPrueba").blur(function () {
        console.log('cambio txt');
        leerCheck();
    });



    function leerCheck() {
        console.log('leer combo');
        var arr = $('[name="checksAutoarchivoDonde[]"]:checked').map(function () {
            console.log(this.value);
            return this.value;
        }).get();
        console.log('valor arr->' + arr);
        var str = arr.join(', ');
        $('#arr').text(JSON.stringify(arr));
        $('#autoarchivoDonde').val(str);
        console.log('valor check' + $('#autoAchivoDondeOp4').prop('checked'));
        if ($('#autoAchivoDondeOp4').prop('checked')) {
            $('#autoarchivoDonde').val(str + ', ' + $('#autoArchivoDondeOtro').val());
            $('#inputOtro').show();
        } else {
            $('#inputOtro').hide();
        }
    }

    //fuente
    $('[name="checkFuente[]"]').click(function () {
        var arr = $('[name="checkFuente[]"]:checked').map(function () {
            return this.value;
        }).get();
        var str = arr.join(', ');
        $('#arr').text(JSON.stringify(arr));
        $('#str').text(str);
        $('#fuente').val(str);
    });
    //versionAutoarchivo
    $('[name="versionAutoarchivo[]"]').click(function () {
        var arr = $('[name="versionAutoarchivo[]"]:checked').map(function () {
            console.log(this.value);
            return this.value;
        }).get();
        console.log(arr);
        var str = arr.join(', ');
        $('#versionAutoarchivoV').val(str);
    });

    selectDatos();

    $('#btn-enviar').click(function () {
        console.log('validar issn');
        checkIssn()
        var issn = $('#issnImpreso').val();
        var id = 'issnImpreso';
        validarIssn2(issn, id);
        var issn = $('#issnElectronico').val();
        var id = 'issnElectronico';
        validarIssn2(issn, id);
        var issn = $('#issnL').val();
        var id = 'issnL';
        validarIssn2(issn, id);
    });


});

function selectDatos() {

    $("#acceso").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {

            if ($(this).val() == value) {
                console.log('cambio valor select acceso');
                $(this).attr("selected", "selected");
            }
        });
    });

    $("#inputGroupSelect01").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {
            console.log('cambio valor select acceso');
            if ($(this).val() == value) {
                $(this).attr("selected", "selected");
            }
        });
    });

    $("#select-titular").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {
            console.log('cambio valor select acceso');
            if ($(this).val() == value) {
                $(this).attr("selected", "selected");
            }
        });
    });

    $("#ubicacionMencionDerechos").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {
            console.log('cambio valor select acceso');
            if ($(this).val() == value) {
                $(this).attr("selected", "selected");
            }
        });
    });

    $("#select-licencia").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {
            console.log('cambio valor select acceso');
            if ($(this).val() == value) {
                $(this).attr("selected", "selected");
            }
        });
    });

    $("#autoArchivo").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {
            console.log('cambio valor select acceso');
            if ($(this).val() == value) {
                $(this).attr("selected", "selected");
            }
        });
    });

    $("#colorRomeo").each(function () {
        var value = $(this).attr("value");
        var id = $(this).attr("id");
        $("#" + id + " option").each(function () {
            console.log('cambio valor select color');
            if ($(this).val() == value) {
                $(this).attr("selected", "selected");
            }
        });
    });
}

function checkIssn() {
    $issn_group = $(".checkIssn");
    console.log($issn_group);
    $issn_group.prop('required', true);
    $issn_group.each(function () {
        console.log($(this).attr("id"));
        console.log($(this).val().length);
        if ($(this).val().length > 0) {
            console.log('invalidoiss');
            $issn_group.prop('required', false);
            return false;
        } else {
            console.log('validoiss');
            $issn_group.prop('required', true);
        }

    });
    return false;
    // $('.checkIssn').blur(function () {
    //     console.log($(this).attr("id"));
    //     console.log($(this).val().length);
    //     if ($(this).val().length > 0) {
    //         $issn_group.prop('required', false);
    //     } else {
    //         $issn_group.prop('required', true);
    //     }
    //     validarIssn($(this).val(), $(this).attr("id"));
    // });

}

function validarIssn2(issn, id) {
    console.log('datos-> ' + issn + ' ' + id);

    if (issn.length > 0) {
        if (issn.length !== 9) {
            console.log('valor invalido -->' + issn);
            $('#' + id).addClass('is-invalid');
        } else {
            console.log('dato bueno');
            $('#' + id).removeClass('is-invalid');
            $('#' + id).addClass('is-valid');
            if (issn.indexOf("-") != -1) {
                console.log("Si tiene -");
                console.log('posicion--->' + issn.charAt(4));
                if (issn.charAt(4) === "-") {
                    console.log('posicion correcta');
                    $('#' + id).removeClass('is-invalid');
                    $('#' + id).addClass('is-valid');
                } else {
                    console.log('posicion invalida');
                    $('#' + id).addClass('is-invalid');
                }
            } else {
                console.log('no tiene -');
                $('#' + id).addClass('is-invalid');
            }
        }
        
    }
}

function isUndefinedOrNull(val){
    return angular.isUndefined(val) || val === null 
}

function isValidData(val){
    return angular.isUndefined(val) || val === null || val.length==0
}
/*
<?php include_once('../conexionPg.php'); ?>
<?php
        // echo '<br>Datos';
        $result = pg_query($dbconn, "SELECT * FROM aura.revista WHERE \"cveRevista\" =" . $_GET['cveRevista']);
        if (!$result) {
            echo "An error occurred.\n";
            exit;
        }
        $count = pg_num_rows($result);
        ?>

        <?php
        if (true) {
            //echo 'entro';
            $n = 1;
            while ($val = pg_fetch_assoc($result)) {
                //var_dump($val);
                ?>
                <?php
    }
} else { ?>
<tr>
    <td colspan="6">Sin Resultados</td>
</tr>
<?php } ?>*/
/*headers:{'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, GET, DELETE",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Client-Offset",
                    'Accept': 'application/json'}*/