var app = angular.module("auraApp", ['ngRoute', 'angularUtils.directives.dirPagination']);


app.controller("auraController", function ($scope, $http, $location) {
    
    //ip|domain: service request
    const servidor = server;

    console.log('Datos Aura');
    $scope.mostrarDatos=false;
    $scope.data= [];
    //inicia con un status de revistas no validadas
    $scope.cargarDatos = function () {
        $https({
            method: 'GET',
            url: servidor+'/service/csgAura/getRevistas'//?getRevistas.php'
        }).then(function (response) {
            $scope.revistas = response.data;
            //inicio-> buscar nombreInstitución|otroNombreInstitución|nombreInstitucion(revista.cveInstitución)
            //................[4]|[9][10] respectivamente, prioridad; [10],[4],[9]
            console.log($scope.revistas);
            for(let i=0;i<$scope.revistas.length;i++){
               if(!isValidData($scope.revistas[i][10])){//[4]
                  $scope.revistas[i][4]=$scope.revistas[i][10];
               }else if(isValidData($scope.revistas[i][4]))
                  $scope.revistas[i][4]=$scope.revistas[i][9];
            }
            //fin-> 
            //agregar a las otras busquedas, morro
            //console.log($scope.revistas);
            $scope.data=$scope.revistas;
            //console.log($scope.data);
            //activa checkbox con revistas no validadas
            $scope.estado = "0";
            $scope.configPages();
            $scope.mostrarDatos = true;
        });
    }
    
    
    $scope.currentPage = 0;
    $scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
    $scope.pages = [];

    $scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
           ini = 1;
           if (Math.ceil($scope.data.length / $scope.pageSize) > 10) fin = 10;
           else fin = Math.ceil($scope.data.length / $scope.pageSize);
        } else {
           if (ini >= Math.ceil($scope.data.length / $scope.pageSize) - 10) {
              ini = Math.ceil($scope.data.length / $scope.pageSize) - 10;
              fin = Math.ceil($scope.data.length / $scope.pageSize);
           }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
            console.log('agrego: ' + i);
           $scope.pages.push({ no: i });
        }
        if ($scope.currentPage >= $scope.pages.length)
           $scope.currentPage = $scope.pages.length - 1;
     };
     $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
     };

     //tooltip
     /*$(function () {
      $('[data-toggle="tooltip"]').tooltip()
     });

     $(function () {
      $('[data-toggle="tooltip2"]').tooltip()
     });*/

     //busqueda de datos que contengan palabra=$scope.searchText
     $scope.buscarDatos = function (){
         console.log($scope.estado);
         //limpiar busquedas por status(valida||novalida)
         if(isValidData($scope.searchText))
            $scope.searchText='a';
         console.log('voy a buscar '+$scope.searchText);
         $scope.estado = "";
         $https({
            method: 'Post',
            url: servidor+'/service/csgAura/getRevistasM/'+normalizaDatos($scope.searchText),//'getRevistasM.php'
            data:{searchText: $scope.searchText}
         }).then(function (response) {
            $scope.revistas = response.data;
            $scope.data=$scope.revistas;
            console.log($scope.revistas);
            //inicio-> buscar nombreInstitución|otroNombreInstitución|nombreInstitucion(revista.cveInstitución)
            //................[4]|[9][10] respectivamente, prioridad; [10],[4],[9]
            console.log($scope.revistas);
            for(let i=0;i<$scope.revistas.length;i++){
               if(!isValidData($scope.revistas[i][10])){//[4]
                  $scope.revistas[i][4]=$scope.revistas[i][10];
               }else if(isValidData($scope.revistas[i][4]))
                  $scope.revistas[i][4]=$scope.revistas[i][9];
            }
            //fin-> 
            $scope.configPages();
            if($scope.revistas.length > 0 ){
               $scope.mostrarDatos = true;
            }else{
               $scope.mostrarDatos = false;
            }
         });
     }

     $scope.filtrar = function(value){
        $scope.searchText="";
        $('#searchText').val('');
        console.log('click');
        console.log('filtrar->' + $scope.estado);
        console.log('voy a buscar');
        $https({
         method: 'Post',
         url: servidor+'/service/csgAura/getRevistasPorStatus/'+$scope.estado,//,'getRevistasEstado.php'
         data:{estado: $scope.estado}
     }).then(function (response) {
         $scope.revistas = response.data;
         $scope.data=$scope.revistas;
         //console.log($scope.revistas);
         //inicio-> buscar nombreInstitución|otroNombreInstitución|nombreInstitucion(revista.cveInstitución)
         //................[4]|[9][10] respectivamente, prioridad; [10],[4],[9]
         console.log($scope.revistas);
         for(let i=0;i<$scope.revistas.length;i++){
            if(!isValidData($scope.revistas[i][10])){//[4]
               $scope.revistas[i][4]=$scope.revistas[i][10];
            }else if(isValidData($scope.revistas[i][4]))
               $scope.revistas[i][4]=$scope.revistas[i][9];
         }
         //fin-> 
         $scope.configPages();
         if($scope.revistas.length > 0 ){
            $scope.mostrarDatos = true;
         }else{
            $scope.mostrarDatos = false;
         }
     });
     }
})

.filter('startFromGrid', function() { //app
    return function(input, start) {
      if (!input || !input.length) { return; } //agregue
      start = +start;
      return input.slice(start);
    }
});

function isValidData(val){
   return angular.isUndefined(val) || val === null || val.length==0
}

function normalizaDatos(cadenaIn){
   console.log(cadenaIn);
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

 