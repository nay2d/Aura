    var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);
    app.controller("auraController", function ($scope, $http, $location) {

    const servidor = server;

    //obtener idioma desde URL
    $scope.idiomaURL = getParametroURL('lang');
    // ********** idioma **********************
    if ($scope.idiomaURL !== '') {
        localStorage.setItem('idioma', $scope.idiomaURL);
        console.log('idiomaURL en localStorage -->' + localStorage.getItem('idioma'));
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

    // ********** consulta de datos ****************
    $scope.datos="";
    $scope.obtenerDatos = function (busqueda){
        $http.get(server+'/service/csgAura/contarDatos/'+busqueda)
        .then(function(response) {
            $scope.datos = response.data;
            console.log($scope.datos);
        }, function(response) {
            console.log('Error');
        });
    };

    $scope.busqueda = {
        "colorRomeo":"colorRomeo",
        "acceso":"acceso",
        "derechosExplotacion":"derechosExplotacion",
        "autoArchivo":"autoArchivo",
        "versionAutoarchivo":"versionAutoarchivo"
    }

    $scope.obtenerDatos($scope.busqueda.colorRomeo);
    console.log($scope.datos);

    $scope.myFunc = function (idioma) {
        console.log(total);
        $scope.total = total;
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

        cargaGraficas();
        idiomaG = idioma;
        console.log('idiomaGra---'+idiomaG);
    };

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

    var total= 0;
    var idiomaG = localStorage.getItem('idioma');

    var prueba = $.ajax({
        url     : server+'/service/csgAura/contarDatos/colorRomeo',
        type    : "get",
        dataType: "json",
        success : (function (data) {
            var suma = 0;
            for (var i = 0; i< data.length;i++) {
                suma = suma + data[i][1];
            }
            data.sort();
            var encabezado = ['Color', 'Total'];
            data.unshift(encabezado);
            colorRomeo = data;
            //console.log(colorRomeo);
            total = suma;
            $('.numero-registros').text(total);
          })
    });

    google.charts.load("current", {packages:["corechart", "table"]});
    google.charts.setOnLoadCallback(graficaColor);

    function graficaColor() {
        console.log('datoscolor->', colorRomeo);
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    var dataEN = new google.visualization.DataTable();
    dataEN.addColumn('string', "Colours");
    dataEN.addColumn('number', "Total");
    dataEN.addRows(4);
    dataEN.setCell(0, 0, "Blue");
    dataEN.setCell(0, 1, colorRomeo[1][1]);
    //dataEN.setCell(1, 0, "Yellow");
    //dataEN.setCell(1, 1, colorRomeo[2][1]);
    dataEN.setCell(1, 0, "White");
    dataEN.setCell(1, 1, colorRomeo[2][1]);
    dataEN.setCell(2, 0, "Green");
    dataEN.setCell(2, 1, colorRomeo[3][1]);
    // dataEN.setCell(3, 0, "Unknown");
    // dataEN.setCell(3, 1, colorRomeo[4][1]);

    var data = new google.visualization.DataTable();
    data.addColumn('string', colorRomeo[0][0]);
    data.addColumn('number', colorRomeo[0][1]);
    data.addRows(5);
    data.setCell(0, 0, colorRomeo[1][0]);
    data.setCell(0, 1, colorRomeo[1][1]);
    data.setCell(1, 0, colorRomeo[2][0]);
    data.setCell(1, 1, colorRomeo[2][1]);
    data.setCell(2, 0, colorRomeo[3][0]);
    data.setCell(2, 1, colorRomeo[3][1]);
    // data.setCell(3, 0, colorRomeo[4][0]);
    // data.setCell(3, 1, colorRomeo[4][1]);

    if(idiomaG === "es"){
    var view = new google.visualization.DataView(data);
    }if(idiomaG === "en"){
    var view = new google.visualization.DataView(dataEN);
    }else{
        var view = new google.visualization.DataView(data);
    }

    view.setColumns([0, 1]);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_color'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' registros - Agrupados por color ROMEO',
          pieHole: .4,
          //colors:['#39B54A','#FCEE21','#29ABE2','#FFFFFF', '#141414'],
          colors:['#29ABE2','#FFFFFF','#9f9f9f','#39B54A', '#141414'],
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_color'));
    chart.draw(view, options);  
    }

    $.ajax({
        url     : server+'/service/csgAura/contarDatos/acceso',
        type    : "get",
        dataType: "json",
        success : (function (data) {
            var dato1 = ['Acceso', 'Total'];
            //data.shift();
            datoDesconodico = data[0][1];
            //console.log(datoDesconodico);
            data.splice(0, 1,['Desconocido', datoDesconodico] );
            data.unshift(dato1);
            //console.log('acceso');
            //console.log(data);
            acceso = data;
          })
    });

    google.charts.setOnLoadCallback(graficaAcceso);

    function graficaAcceso() {
        console.log('accessooo', acceso);
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};

    var dataEN = new google.visualization.DataTable();
    dataEN.addColumn('string', "Access");
    dataEN.addColumn('number', acceso[0][1]);
    dataEN.addRows(5);
    dataEN.setCell(0, 0, "Unknown");
    dataEN.setCell(0, 1, acceso[1][1]);
    dataEN.setCell(1, 0, "Free");
    dataEN.setCell(1, 1, acceso[2][1]);
    dataEN.setCell(2, 0, "Free after an embargo period");
    dataEN.setCell(2, 1, acceso[3][1]);
    // dataEN.setCell(3, 0, "Hybrid");
    // dataEN.setCell(3, 1, acceso[4][1]);
    // dataEN.setCell(4, 0, "Hybrid");
    // dataEN.setCell(4, 1, acceso[5][1]);
    

    var data = new google.visualization.DataTable();
    data.addColumn('string', acceso[0][0]);
    data.addColumn('number', acceso[0][1]);
    data.addRows(5);
    data.setCell(0, 0, acceso[1][0]);
    data.setCell(0, 1, acceso[1][1]);
    data.setCell(1, 0, acceso[2][0]);
    data.setCell(1, 1, acceso[2][1]);
    data.setCell(2, 0, acceso[3][0]);
    data.setCell(2, 1, acceso[3][1]);
    // data.setCell(3, 0, acceso[4][0]);
    // data.setCell(3, 1, acceso[4][1]);
    // data.setCell(4, 0, acceso[5][0]);
    // data.setCell(4, 1, acceso[5][1]);

    if(idiomaG === "es"){
    var view = new google.visualization.DataView(data);
    }if(idiomaG === "en"){
    var view = new google.visualization.DataView(dataEN);
    }else{
        var view = new google.visualization.DataView(data);
    }

    view.setColumns([0, 1]);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_acceso'));
    table.draw(view, optionsTable);

    var options = {
           //title: total + ' registros - Agrupado por Acceso',
          pieHole: 0.5,
          colors:['#9F9F9F','#8CBC00','#F7931E','#666666','#166822'],
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_acceso'));
    chart.draw(view, options);  
    }

    $.ajax({
    url     : server+'/service/csgAura/contarDatos/derechosExplotacion',
    type    : "get",
    dataType: "json",
    success : (function (data) {
            var dato1 = ['Mención específica de derechos', 'Total'];
            data.unshift(dato1);
            //console.log('derechos');
            //console.log(data);
            derechosExplotacion = data;
          })
    });

    google.charts.setOnLoadCallback(graficaDerechos);

    function graficaDerechos() {
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};
    var dataEN = new google.visualization.DataTable();
    dataEN.addColumn('string', "Specific mention of right");
    dataEN.addColumn('number', derechosExplotacion[0][1]);
    dataEN.addRows(2);
    dataEN.setCell(0, 0, "Yes");
    dataEN.setCell(0, 1, derechosExplotacion[1][1]);
    dataEN.setCell(1, 0, "No");
    dataEN.setCell(1, 1, derechosExplotacion[2][1]);

    var data = new google.visualization.DataTable();
    data.addColumn('string', derechosExplotacion[0][0]);
    data.addColumn('number', derechosExplotacion[0][1]);
    data.addRows(2);
    data.setCell(0, 0, derechosExplotacion[1][0]);
    data.setCell(0, 1, derechosExplotacion[1][1]);
    data.setCell(1, 0, derechosExplotacion[2][0]);
    data.setCell(1, 1, derechosExplotacion[2][1]);

    if(idiomaG === "es"){
    var view = new google.visualization.DataView(data);
    }if(idiomaG === "en"){
    var view = new google.visualization.DataView(dataEN);
    }else{
        var view = new google.visualization.DataView(data);
    }

    view.setColumns([0, 1]);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};


    var table = new google.visualization.Table(document.getElementById('tabla_derechos'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' regitros - Mención específica de derechos',
          pieHole: 0.5,
          colors:['#A3C933','#495D0E'],
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_derechos'));
    chart.draw(view, options);  
    }

    $.ajax({
    url     : server+'/service/csgAura/contarDatos/autoArchivo',
    type    : "get",
    dataType: "json",
    success : (function (data) {
        //console.log("datos...2");
        //console.log(data);
        var dato1 = ['¿Permite el auto-archivo?', 'Total'];
        data.unshift(dato1);
        //console.log('acceso');
        //console.log(data);
        autoArchivo = data;
      })
    });

    google.charts.setOnLoadCallback(graficaAutoArchivo);

    function graficaAutoArchivo() {
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};
    var dataEN = new google.visualization.DataTable();
    dataEN.addColumn('string', "Does it allow self-archive?");
    dataEN.addColumn('number', autoArchivo[0][1]);
    dataEN.addRows(4);
    dataEN.setCell(0, 0, "Yes in pay-to-publish OA articles");
    dataEN.setCell(0, 1, autoArchivo[1][1]);
    dataEN.setCell(1, 0, "Yes");
    dataEN.setCell(1, 1, autoArchivo[2][1]);
    dataEN.setCell(2, 0, "Not specified");
    dataEN.setCell(2, 1, autoArchivo[3][1]);
    // dataEN.setCell(3, 0, autoArchivo[4][0]);
    // dataEN.setCell(3, 1, autoArchivo[4][1]);

    var data = new google.visualization.DataTable();
    data.addColumn('string', autoArchivo[0][0]);
    data.addColumn('number', autoArchivo[0][1]);
    data.addRows(4);
    data.setCell(0, 0, autoArchivo[1][0]);
    data.setCell(0, 1, autoArchivo[1][1]);
    data.setCell(1, 0, autoArchivo[2][0]);
    data.setCell(1, 1, autoArchivo[2][1]);
    data.setCell(2, 0, autoArchivo[3][0]);
    data.setCell(2, 1, autoArchivo[3][1]);
    // data.setCell(3, 0, autoArchivo[4][0]);
    // data.setCell(3, 1, autoArchivo[4][1]);

    if(idiomaG === "es"){
    var view = new google.visualization.DataView(data);
    }if(idiomaG === "en"){
    var view = new google.visualization.DataView(dataEN);
    }else{
        var view = new google.visualization.DataView(data);
    }

    view.setColumns([0, 1]);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_autoarchivo'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' registros - ¿Permite el auto-archivo?',
          pieHole: 0.5,
          colors:['#483D8B','#4A55D2','#9370DB','#B7BBED'],
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_autoarchivo'));
    chart.draw(view, options);  
    }

    $.ajax({
        url     : server+'/service/csgAura/contarDatos/versionAutoarchivo',
        type    : "get",
        dataType: "json",
        success : (function (data) {
            console.log("dataVersionAUtoArchivo");
            console.log(data);
                    var dato1 = ['Agrupados segun versión de auto-archivo', 'Total'];
                    data.sort();
                    //console.log(data[1][1]);
                    dato = data[1][1];
                    var datoNinguno = data[0][1];
                    data.splice(0, 1,['Ninguno', datoNinguno] );
                    data[0][1] += dato;
                    //console.log(data[0]);
                    data.unshift(dato1);
                    data.splice(2, 1);
                    //console.log('versionAutoarchivo');
                    //console.log(data);
                    versionAutoarchivo = data;
                  })
        });

    google.charts.setOnLoadCallback(graficaVersion);

    function graficaVersion() {
    var cssClassNames = {
    'headerRow': 'backgroundCell',
    'oddTableRow': 'beige-background'};
    var dataEN = new google.visualization.DataTable();
    dataEN.addColumn('string', "Classified by self-archive version");
    dataEN.addColumn('number', versionAutoarchivo[0][1]);
    dataEN.addRows(3);
    dataEN.setCell(0, 0, "Not specified");
    dataEN.setCell(0, 1, versionAutoarchivo[1][1]);
    dataEN.setCell(1, 0, "Post-print");
    dataEN.setCell(1, 1, versionAutoarchivo[2][1]);
    dataEN.setCell(2, 0, "Pre-print");
    dataEN.setCell(2, 1, versionAutoarchivo[3][1]);

    var data = new google.visualization.DataTable();
    data.addColumn('string', versionAutoarchivo[0][0]);
    data.addColumn('number', versionAutoarchivo[0][1]);
    data.addRows(3);
    data.setCell(0, 0, versionAutoarchivo[1][0]);
    data.setCell(0, 1, versionAutoarchivo[1][1]);
    data.setCell(1, 0, versionAutoarchivo[2][0]);
    data.setCell(1, 1, versionAutoarchivo[2][1]);
    data.setCell(2, 0, versionAutoarchivo[3][0]);
    data.setCell(2, 1, versionAutoarchivo[3][1]);

    if(idiomaG === "es"){
    var view = new google.visualization.DataView(data);
    }if(idiomaG === "en"){
    var view = new google.visualization.DataView(dataEN);
    }else{
        var view = new google.visualization.DataView(data);
    }


    view.setColumns([0, 1]);

    var optionsTable = {'height': '100%', 'width': '100%', 'cssClassNames': cssClassNames};

    var table = new google.visualization.Table(document.getElementById('tabla_version'));
    table.draw(view, optionsTable);

    var options = {
          //title: total + ' registros - Agrupados segun versión de auto-archivo',
          pieHole: 0.5,
          colors:['#99993D','#CB1111','#E57373'],
          pieSliceTextStyle: {color: 'black'},
          sliceVisibilityThreshold: .0001
        };

    var chart = new google.visualization.PieChart(document.getElementById('grafica_version'));
    chart.draw(view, options);  
    }

    function cargaGraficas(){
    console.log('actulizarGraficas');
    google.charts.setOnLoadCallback(graficaColor);
    google.charts.setOnLoadCallback(graficaAcceso);
    google.charts.setOnLoadCallback(graficaDerechos);
    google.charts.setOnLoadCallback(graficaAutoArchivo);
    google.charts.setOnLoadCallback(graficaVersion);
    }