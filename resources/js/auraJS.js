var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);


app.controller("auraController", function ($scope, $http, $location) {

    const servidor = server;

    $scope.abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    $scope.numeros =['1','2','3','4','5','6','7','8','9','0','@','#','$','%','&','/','(',')','='];
    $scope.letraSelected = "A";
    $scope.numeroSelected ="";  
    $scope.listaRevistas = [];
    $scope.searchText = '';
    var arrayRevistas;

    $scope.claveRevista = getParametroURL("id");

    //obtener idioma desde URL
    $scope.idiomaURL = getParametroURL('lang');

    if ($scope.idiomaURL !== '') {
        localStorage.setItem('idioma', $scope.idiomaURL);
        console.log('idiomaURL en localStorage -->' + localStorage.getItem('idioma'));
    }

    $scope.buscarNombre = function () {
        $scope.cargando = true;
        $scope.listaRevistas = [];
        console.log('buscar texto ->' + $scope.searchText);
        if($scope.searchText.length==0)
            $scope.searchText='A';
        $https({
            method: 'post',
            url: servidor+'/service/csgAura/getRevistasMvalidas/'+normalizaDatos($scope.searchText),//'readCSV2.php'
            data: { texto: $scope.searchText }
        }).then(function (response) {
            $scope.listaRevistas = response.data;//
            console.log($scope.listaRevistas);
            $scope.cargando = false;
        });
    }


    $scope.buscarOtros = function () {
        $scope.cargando = true;   
        console.log('buscar otros ->');
        //if($scope.searchText.length==0)
           // $scope.searchText='1';
        $https({
            method: 'GET',
            url: servidor+'/service/csgAura/buscarRevistasCaracter/',//'readCSV2.php'
            //data: { texto: $scope.searchTextCH }
        }).then(function (response) {
            $scope.listaRevistas = response.data;//
            console.log($scope.listaRevistas);
            $scope.cargando = false;
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
        $('#formularioES').css('display', 'none');
        console.log("entro al if Formulario");
    } if ($scope.idioma == 'es') {
        $('#formularioEN').css('display', 'none');
        console.log("entro al if Formulario");
    }
    console.log($scope.letraSelected);
    $scope.cargando = true;
    //carga los primeros datos
    $https({
        method: 'post',
        url: servidor+'/service/csgAura/getRevistasM2/'+$scope.letraSelected,//'readCSV.php'
        data: { letra: $scope.letraSelected }
        //headers:{'Access-Control-Allow-Origin':"*"}
    }).then(function (response) {        
        //$scope.listaRevistas = getListaObject(response.data);//arrayRevistas
        $scope.listaRevistas = response.data; //para recibir el json hdtptm
        console.log($scope.listaRevistas);
        $scope.cargando = false;
    });

    $scope.seleccionarLetra = function (letra) {
        $scope.cargando = true;
        $scope.listaRevistas = [];
        $scope.letraSelected = letra;
        console.log('cambio de letra');
        $https({
            method: 'Post',
            url: servidor+'/service/csgAura/getRevistasM2/'+$scope.letraSelected,//'readCSV.php'
            data: { letra: $scope.letraSelected }
        }).then(function (response) {
            $scope.listaRevistas = response.data;
            console.log($scope.listaRevistas);
            $scope.searchText = '';
            $scope.cargando = false;
        });
    }

    $scope.tecla = function (e) {
        if (e.which === 13) {
            $scope.buscarNombre();
        }
    }

    $scope.resultado = true;

    $scope.myFunc = function (idioma) {
        $scope.idioma = idioma;
        console.log('prueba' + idioma);
        localStorage.setItem('idioma', idioma);
        console.log('guardoIdiomaLocalStorage--> ' + localStorage.getItem('idioma'));
        //$scope.colorIdioma(idioma);
        if (idioma == 'en') {
            $('#formularioES').css('display', 'none');
            $('#formularioEN').css('display', 'block');
        } if (idioma == 'es') {
            $('#formularioEN').css('display', 'none');
            $('#formularioES').css('display', 'block');
        }
    };

});

function separarLineas(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split('|');
    var lines = [];
    var inicial;

    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split('|');
        if (data.length == headers.length) {
            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            inicial = data[1].replace(/[ ]/g, "");
            inicial = inicial.substring(0, 1);
            tarr.push(inicial);
            lines.push(tarr);
        }
    }
    return lines;
}

//no se utiliza
function getListaObject(listaArray) {
    var listaRevistaObject = [];
    var revista;
    console.log(listaArray);
    for (var i = 0; i < listaArray.length; i++) {
        revista = {
            clave: listaArray[i][0],
            nomRevista: listaArray[i][1],//revista
            colorRomeo: listaArray[i][2],//color
            tipoLicencia: listaArray[i][3],
            acceso: listaArray[i][4],
            autoarchivo: listaArray[i][5],
            versionesAutoarchivo: listaArray[i][6],
            inicial: listaArray[i][7]
        };
        console.log(revista);
        listaRevistaObject.push(revista);
    }
    return listaRevistaObject;
}

function getParametroURL(parametro) {
    var parametros = window.parent.location.search.substring(1).split('&');

    for (var i = 0; i < parametros.length; i++) {
        if (parametros[i].indexOf(parametro + '=') != -1) {
            return decodeURI(parametros[i].split('=')[1]);
        }
    }
    return "";
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function normalizaDatos(cadenaIn){
    var originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
    var modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
    var cadena = strtr(cadenaIn, originales, modificadas);
    cadena = cadena.toLowerCase();
    return (cadena);
}

function strtr (str, from, to) {
    var fr = '',
      i = 0,
      j = 0,
      lenStr = 0,
      lenFrom = 0,
      tmpStrictForIn = false,
      fromTypeStr = '',
      toTypeStr = '',
      istr = '';
    var tmpFrom = [];
    var tmpTo = [];
    var ret = '';
    var match = false;
   
    // Received replace_pairs?
    // Convert to normal from->to chars
    if (typeof from === 'object') {
      tmpStrictForIn = this.ini_set('phpjs.strictForIn', false); // Not thread-safe; temporarily set to true
      from = this.krsort(from);
      this.ini_set('phpjs.strictForIn', tmpStrictForIn);
   
      for (fr in from) {
        if (from.hasOwnProperty(fr)) {
          tmpFrom.push(fr);
          tmpTo.push(from[fr]);
        }
      }
   
      from = tmpFrom;
      to = tmpTo;
    }
   
    // Walk through subject and replace chars when needed
    lenStr = str.length;
    lenFrom = from.length;
    fromTypeStr = typeof from === 'string';
    toTypeStr = typeof to === 'string';
   
    for (i = 0; i < lenStr; i++) {
      match = false;
      if (fromTypeStr) {
        istr = str.charAt(i);
        for (j = 0; j < lenFrom; j++) {
          if (istr == from.charAt(j)) {
            match = true;
            break;
          }
        }
      } else {
        for (j = 0; j < lenFrom; j++) {
          if (str.substr(i, from[j].length) == from[j]) {
            match = true;
            // Fast forward
            i = (i + from[j].length) - 1;
            break;
          }
        }
      }
      if (match) {
        ret += toTypeStr ? to.charAt(j) : to[j];
      } else {
        ret += str.charAt(i);
      }
    }
   
    return ret;
  }