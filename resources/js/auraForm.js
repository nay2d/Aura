var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);


app.controller("auraController", function ($window, $scope, $http, $location) {//agregué $window
    
    //obtiene la ip de servicio;
    const servidor = server;
    const idiomaJson = cargarJson;
    console.log('inicio');
    //idioma
    
    $scope.traducir = function (idioma) {
        $https({
            method: 'GET',
            url: idiomaJson+idioma+'.json'//url: '../aura/resources/js/json/'+idioma+'.json'
        }).then(function (data) {
            $scope.t = data.data;
            console.log(data);
            console.log('traduccion');
            console.log($scope.t);
        }, function (error) {
            console.log("Error al cargar archivo Traducción");
        });
    }

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
    
    //carga Paises desde la DB
    $scope.obtenerPaises = function () {
        $scope.paisesArray = [];
        $https({
            method: 'GET',
            url: servidor+'/service/csgAura/getPaises'
        }).then(function (response) {
            $scope.paises = response.data;
            for (let index = 0; index < $scope.paises.length; index++) {
               const cvePais = $scope.paises[index][0];
               const nomPais = $scope.paises[index][1];
               const tipo = $scope.paises[index][2];
               var arraynew = { cvepais: cvePais, nompais: nomPais, tpoingreso: tipo};
               $scope.paisesArray.push(arraynew);
            }
            //console.log($scope.paisesArray);
        });
        //$scope.obtenerPaises2();
    }

    //obtener categoria db
    $scope.obtenerCategoria = function () {
        $scope.categorias = [];
        $https({
            method: 'GET',
            url: servidor+'/service/csgAura/getCatRevista'//'getCategtoria'
        }).then(function (response) {
            //$scope.categorias = response.data;
            $scope.categoriasArray = response.data;
            for (let index = 0; index < $scope.categoriasArray.length; index++) {
                var arraynew = {cveCategoria: $scope.categoriasArray[index][0],
                                nomCategoria: $scope.categoriasArray[index][1]};
                $scope.categorias.push(arraynew);
            }
            //console.log($scope.categorias);
        });
    }
    //obtener cargos
    $scope.obtenerCargo = function () {
        $scope.cargos = 'Administración,Apoyo académico,Apoyo editorial,Apoyo secretarial,Apoyo técnico,Asesor,Asesor técnico,Asistente de producción,Asistente editorial,Codirector,Coeditor,Coeditor Internacional,Comisión consultiva,Comité académico,Comité asesor,Comité científico,Comité Científico y Editorial,Comité de redacción,Comité editorial,Comité ejecutivo,Comité ético,Comité técnico,Consejo asesor,Consejo científico,Consejo Científico Internacional,Consejo Científico Nacional,Consejo de redacciónConsejo directivo,Consejo editorial,Consejo editorial consultivo,Consejo Editorial Internacional,Consejo Editorial Nacional,Consejo honorario,Consejo técnico,Consultor,Coordinación de comité editorial,Coordinador,Coordinador editorial,Corrección de abstracts,Corrección filológica,Corrector de estilo,Corrector de prueba,Corrector editorial,Cuerpo Editorial Científico,Cuidado de la edición impresa,Diagramación,Director,Director adjunto,Director asociado,Director científico,Director colegiado,Director editorial,Director ejecutivo,Director emérito,Director fundador,Director honorario,Diseñador,Diseñador web,Diseño y desarrollo de página web,Diseño y producción,Distribución,Docente Pre-Grado - Ex-Decano,Edición,Edición electrónica,Editor,Editor académico,Editor adjunto,Editor asociado,Editor científico,Editor de distribución,Editor de formato,Editor de la versión electrónica,Editor de redacción,Editor de sección,Editor delegado,Editor ejecutivo,Editor emérito,Editor en jefe,Editor general,Editor honorario,Editor técnico,Editor temático,Equipo editorial,Evaluador,Formación,Fotografía,Fundador,Gerente editorial,Gestión editorial,Maquetación,Mesa de redacción,Montaje,No se conoce,Presidente,Presidente de comité editorial,Presidente de consejo asesor,Presidente de consejo de redacción,Presidente del Consejo editorial,Presidente honorario,Producción editorial,Redacción,Representante legal,Responsable editorial,Secretario,Secretario de redacción,Secretario técnico,Soporte informático,Subdirector,Subeditor,Traductor,Vicepresidente,Vicesecretario,Vocal,Webmaster'.split(',');
    }

    //instituciones
    $scope.fetchUsers = function () {
        $scope.searchResult = [];
        if(!isUndefinedOrNull($scope.searchText) && !isValidData($scope.pais)){
            var searchText_len = $scope.searchText.trim().length;
            // Check search text length
            if (searchText_len > 3) {
                $https({
                    method: 'get',
                    url: servidor+'/service/csgAura/getInstitucion/'+$scope.pais+'/'+$scope.searchText
                    //data: { busqueda: $scope.searchText, cvePais: $scope.pais }
                }).then(function successCallback(response) {
                    $scope.searchResultA = response.data;
                    for (let index = 0; index < $scope.searchResultA.length; index++) {
                        const cveentint = $scope.searchResultA[index][0];
                        const nomentint = $scope.searchResultA[index][1];
                        var arraynew = { cveentint: cveentint, nomentint: nomentint};
                        $scope.searchResult.push(arraynew);
                    }
                    console.log($scope.searchResult);
                });
            } else {
                $scope.searchResult = {};
            }
        }
    }

    // Set value to search box
    $scope.cveInstitucion;
    $scope.setValue = function (index, $event) {
        $scope.searchText = $scope.searchResult[index].nomentint;
        $scope.cveInstitucion = $scope.searchResult[index].cveentint;
        $scope.searchResult = {};
        $event.stopPropagation();
    }

    $scope.searchboxClicked = function ($event) {
        $event.stopPropagation();
    }

    $scope.containerClicked = function () {
        $scope.searchResult = {};
    }

    //indizaciones
    $scope.products = [];
    $scope.productsCve = [];
    $scope.productsCve2;
    $scope.addItem = function ($event) {
        if(!isValidData($scope.addText)){
            console.log('indizacion->'+$scope.addText);
            $scope.products.push($scope.addText);
            $scope.productsCve.push($scope.addCve);
            $scope.productsCve2 = $scope.productsCve.toString();
            console.log($scope.productsCve2);
            $scope.addText = '';
            $scope.searchText1 = '';
            $event.stopPropagation();
        }
    }
    $scope.removeItem = function (x) {
        console.log('borras datos');
        console.log(x);
        $scope.products.splice(x, 1);
        $scope.productsCve.splice(x, 1);
        $scope.productsCve2 = $scope.productsCve;
        console.log('3 '+$scope.productsCve2);
    }

    $scope.buscarIndizaciones = function () {
        $scope.searchResultIndizacion = [];
        var searchText_len = $scope.searchText1.trim().length;
        // Check search text length
        if (searchText_len > 3) {
            $https({
                method: 'POST',//es post
                url: servidor+'/service/csgAura/getIndizacion/'+$scope.searchText1
                //data: { searchText: $scope.searchText1, 'country_id': $scope.country }
            }).then(function successCallback(response) {
                $scope.searchResult1 = response.data;
                for (let index = 0; index < $scope.searchResult1.length; index++) {
                    var arraynew = {cveentinx: $scope.searchResult1[index][0],
                                    nomentinx: $scope.searchResult1[index][1],
                                    nompais: $scope.searchResult1[index][3]};
                    $scope.searchResultIndizacion.push(arraynew);
                }
                //console.log($scope.searchResultIndizacion);
            });
        } else {
            $scope.searchResult = {};
        }
    }

    // Set value to search box
    $scope.setValue1 = function (index, $event) {
        $scope.searchText1 = $scope.searchResultIndizacion[index].nomentinx; //searchResult1
        $scope.addText = $scope.searchResultIndizacion[index].nomentinx;     //searchResult1
        $scope.addCve = $scope.searchResultIndizacion[index].cveentinx;      //searchResult1
        console.log($scope.searchResultIndizacion[index].cveentinx);
        $scope.searchResultIndizacion = {};                                  //searchResult1
        $event.stopPropagation();
    }

    $scope.searchboxClicked1 = function ($event) {
        $event.stopPropagation();
    }

    $scope.containerClicked1 = function () {
        $scope.searchResultIndizacion = {};      //searchResult1
    }

    //mostrar campos otro institución
    $scope.otroInstitucion = false;
    $scope.mostrarOtro = function ($event) {
        console.log("valor check->" + $scope.otroInstitucion);
        $scope.searchText = '';
        $scope.cveInstitucion = '';
        jQuery('#institucion').prop('required', false);
    }
    //categoria  otro
    $scope.mostrarCategoriaOtro = false;
    $scope.categoriaRevistaV = function ($event) {
        if ($scope.categoriaRevista === 'Otro') {
            $scope.mostrarCategoriaOtro = true;
            $('#categoriaOtro').prop('required', true);
        } else {
            $scope.mostrarCategoriaOtro = false;
            $('#categoriaOtro').prop('required', false);
        }
        console.log('valor categoria: ' + $scope.categoriaRevista);
        console.log($scope.mostrarCategoriaOtro);
    }

    //licencia otro
    $scope.mostrarLicenciaPublicacionOtro = false;
    $scope.licenciaPublicacionV = function ($event) {
        if ($scope.licenciaPublicacion === 'Otro') {
            $scope.mostrarLicenciaPublicacionOtro = true;
        } else {
            $scope.mostrarLicenciaPublicacionOtro = false;
        }
        console.log('valor categoria: ' + $scope.licenciaPublicacion);
        console.log($scope.mostrarLicenciaPublicacionOtro);
    }
    //

    // *** permite: auto-archivo? ***
    //inician estos items status=deshabilitados
    $scope.mostrarAutoarchivo = true;
    $scope.opcionesAa1 = true;
    $scope.opcionesAa2 = true;
    $scope.ocultarAutoArchivo = function () {
        //auto-archivo="No"; deshabilitar items
        if(document.getElementById('autoArchivo').value== "No"){
            $scope.mostrarAutoarchivo = true;
            $scope.opcionesAa1 = true;
            $scope.opcionesAa2 = true;
            //resetear los valores auto-archivo(pre,post)
            $scope.auto1 = "0";
            $scope.auto2 = "0";
            $('#versionDelAutoArchivo').val("");
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
        $scope.limpiarItems();       
    }

    $scope.opcionesAutoArchivo2 = function(){
        $scope.opcionesAa1 = false;
        $scope.opcionesAa2 = true;
        $scope.limpiarItems();
    }

    //limpia check y valor de autoArchivoMomento
    $scope.limpiarItems = function(){
        $scope.autoCuando1 = "0";
        $scope.autoCuando2 = "0";
        $scope.autoCuando3 = "0";
        $scope.autoCuando4 = "0";
        $scope.autoDonde1 = '0';
        $scope.autoDonde2 = '0';
        $scope.autoDonde3 = '0';
        $scope.autoAchivoDondeOtro = '0';
        $('#autoarchivoMomento').val("");
        $('#autoArchivoDondeOtro').val("");
        $('#autoarchivoDonde').val("");
        $scope.autoArchivoOtro();
        $scope.autoAchivoDondeOtro = false;
    }

    $scope.autoArchivoDondeOtro = false;
    $scope.autoArchivoOtro = function () {
        if ($scope.autoAchivoDondeOtro) {
            $scope.autoArchivoDondeOtro = false;
        } else {
            $scope.autoArchivoDondeOtro = true;
        }
        //console.log('valor check: ' + $scope.autoAchivoDondeOtro);
        //console.log($scope.autoArchivoDondeOtro);
    }


    //jquery
    $(document).ready(function () {
        //crea cadena de valores separados por coma
        $('[name="checks[]"]').click(function () {
            var arr = $('[name="checks[]"]:checked').map(function () {
                return this.value;
            }).get();
            var str = arr.join(', ');
            $('#arr').text(JSON.stringify(arr));
            $('#str').text(str);
            $('#autoarchivoMomento').val(str);//
        });
        //crear version-autoArchivo
        $('[name="checks2[]"]').click(function () {
            var arr = $('[name="checks2[]"]:checked').map(function () {
                return this.value;
            }).get();
            var str = arr.join(', ');
            $('#arr').text(JSON.stringify(arr));
            $('#str2').text(str);
            $('#versionDelAutoArchivo').val(str);
        });
        // auto-archivoCuando
        $('[name="checksAutoarchivoDonde[]"]').click(function () {
            var arr = $('[name="checksAutoarchivoDonde[]"]:checked').map(function () {
                return this.value;
            }).get();
            var str = arr.join(', ');
            $('#arr').text(JSON.stringify(arr));
            $('#str1').text(str);
            $('#autoarchivoDonde').val(str);
        });
    });

    $issn_group = $(".checkIssn");
    console.log($issn_group);
    $issn_group.prop('required', true);
    $('.checkIssn').blur(function () {
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
        console.log('datos->' + issn + ' ' + id);
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
            console.log('datos->' + id + ' - '+issn);
            $.ajax({
                type: 'POST',//es POST
                url: servidor+'/service/csgAura/getIssn/'+id+'/'+issn, //,getIssn.php
                //data: { issn: issn, tabla: id },
                success: function (response) {
                    response = JSON.parse(response);
                    console.log('respuesta: '+response);
                    //if (response === false) {
                    //validación, sí no exciste, regresa un campo vacio
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

    $scope.guardarDatosPg = function(){
        //console.log(document.getElementById("formAura").value);
        if(document.getElementById("formAura").value){
            /*** Json Construction Revista(object) ***/
            //value check (view dinamic) 
            var nombreOtraInstitucion="";
            if($scope.otroInstitucion){
                $scope.nombreInstitucion="";
                $scope.claveInstitucion="";
                nombreOtraInstitucion=document.getElementById('otroNombreInstitucion').value;
            }
            if($scope.mostrarLicenciaPublicacionOtro){
                $scope.licenciaPublicacion=document.getElementById('licenciaPublicacionOtro').value;
            }

            var ubicacionDelAutoArchivo=""
            if($scope.autoAchivoDondeOtro && !isUndefinedOrNull($scope.autoAchivoDondeOtro)){
                if(document.getElementById('autoarchivoDonde').value.length>0)
                    ubicacionDelAutoArchivo=document.getElementById('autoArchivoDondeOtro').value+', ';//+', '
                else
                    ubicacionDelAutoArchivo=document.getElementById('autoArchivoDondeOtro').value;//+', '
            }
            var jsonData = {
                    "nombreRevista" : document.getElementById('nombreRevista').value,
                    "urlRevista" : document.getElementById('urlRevista').value,
                    "clavePais" : document.getElementById('pais').value,
                    //"nombreInstitucion" : $scope.searchText,//document.getElementById('institucion').value,
                    "claveIntitucion": $scope.cveInstitucion,//document.getElementById('cveInstitucion').value,
                    "tipoDeEditorial": document.getElementById('tipoEditorial').value,
                    "nombreOrgano": document.getElementById('organoDeExpresion1').value,
                    "issnTipoImpreso": document.getElementById('issnImpreso').value,
                    "issnTipoElectronico": document.getElementById('issnElectronico').value,
                    "issnTipoL": document.getElementById('issnL').value,
                    "tipoAcceso": document.getElementById('acceso').value,
                    "mesesDeEmbargo": document.getElementById('mesesEmbargo').value,
                    "claveCategoriaRevista": document.getElementById('categoriaRevista').value,
                    "derechoExplotacion": document.getElementById('derechosExplotacion').value,
                    "titularDerecho": document.getElementById('select-titular').value,
                    "ubicacionCopyrigth": document.getElementById('ubicacionMencionDerechos').value,
                    "urlMencionCopyrigth": document.getElementById('urlMencionDerechos').value,
                    "nombreLicenciaPublicacion": $scope.licenciaPublicacion,
                    "urlTiposLicencia": document.getElementById('urlTipoPublicacion').value,
                    "urlInstruccionDelAutor": document.getElementById('urlInstruccionAutor').value,
                    "opcionAutoArchivo": document.getElementById('autoArchivo').value,
                    //"versionDelAutoArchivo": document.getElementById('customRadio22').value, checar esta madre, csm el navajas
                    "versionDelAutoArchivo": document.getElementById('versionDelAutoArchivo').value, 
                    "autoArchivoDelMomento": document.getElementById('autoarchivoMomento').value, 
                    "ubicacionDelAutoArchivo": ubicacionDelAutoArchivo+document.getElementById('autoarchivoDonde').value, ///aqui
                    "colorDeRomeo": document.getElementById('colorRomeo').value,
                    "indizacionExtendida": $scope.productsCve2,//document.getElementById('listaIndizacion').value,//cambiar por $scope
                    "nombreDelContacto": document.getElementById('nombreResponsable').value,
                    "cargoDelContacto": document.getElementById('cargoResponsable').value,
                    "telefonoUsuario": document.getElementById('telefonoResponsable').value,
                    "emailUsuario": document.getElementById('emailResponsable').value,
                    "fechaDeRegistro":"",//set in service
                    "decripcionFuente":"",//se modifica después 
                    "estadoValidada":"0", 
                    "nombreOtraInstitucion": nombreOtraInstitucion,//formPagina[5].id
                    "claveAmeli":"",//se modifica después
                    "claveRedalyc":"",//se modifica después
                    "fechaUltimaActualizacion":"",//se modifica después
            };
            console.log(jsonData);
            $scope.guardando=true;
            $https.post(
                servidor+'/service/csgAura/incluirRevista',//datosPagina
                jsonData
            ).then(function successCallback(response) {
                if(response.data=="1")
                    alert('El registro de su revista se ha realizado exitosamente');
                else
                    alert('Error al registrar');
                $('#formAura').val(false);
                $window.location.href = './index.html';
            }, function errorCallback(response) {
                console.log(response);
                alert('Error al registrar');
                $window.location.href = './index.html';
            });
        }
    }

    $('#emailResponsable').on('keyup', function () {
        var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        if (regex.test($('#emailResponsable').val())) {
            $('#emailResponsable').addClass('is-valid');
            $('#emailResponsable').removeClass('is-invalid');
        } else {
            $('#emailResponsable').addClass('is-invalid');
        }
    });

    function isValidData(val){
        return angular.isUndefined(val) || val === null || val.length==0
    }

    function isUndefinedOrNull(val){
        return angular.isUndefined(val) || val === null 
    }
});
//http (ur,data,[headers])
//headers: {
//    'Content-Type': 'application/json; charset=utf-8'
//}
//document.querySelector("#sign-up").addEventListener("submit", createAccount, false);
//document.getElementById("myForm").action = "/action_page.php";
//https://codeday.me/es/qa/20181216/23209.html