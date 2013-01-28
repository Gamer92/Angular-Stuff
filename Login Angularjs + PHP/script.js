// Llamamos al modulo
var myAppModule = angular.module('myApp', []);

//Creamos la directiva loged
myAppModule.directive('loged', function(){
    return{
        restrict: 'E',
        template:   "<div>"+
                        "<b>Bienvenido</b><br>"+
                    "</div>",
        }
});

// Creamos un controlador llamado loginCtrl
function loginCtrl($scope, $http) {     
    //al mo mento que le den click al ng-click doLogin() ejecutamos la funcion
    $scope.doLogin = function() {
        /* 
            $http es similar a AJAX de jQuery con una funcionalidad muy similar
            pero lo que si son iguales es que son llamadas AJAX, elijes metodo,
            destino, datos a enviar etc.  
        */
        $http({
                //usaremos el metodo POST para enviar los datos
                method: 'POST', 
                //seleccionamos a  que URL llegara la informacion
                url: 'formulario.php',
                //codificamos el contenido
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //esta es la informacion que vamos a mandar
                data: { 
                        'usuario': $scope.usuario, 
                        'contrasena': $scope.contrasena 
                     },
            }).
            // si la peticion ajax se realizo con exito se ejecuta success
            success(function(data, status) {

                $scope.data = data;
                if(data == 'FALSE'){
                    $scope.aviso = 'Usuario o contraseña invalidos';
                } else {
                    toogleDiv();
                }

            }).
            //si la peticion ajax NO fue exitosa se ejecuta error
            error(function(data, status) {
                $scope.data = data || "FALSE";
                $scope.status = status;  
                $scope.aviso = 'Ha pasado algo inesperado';
            });
    };
}
/* Con esta funcion escondemos el form de login y mostramos el saludo de bienvenida */
function toogleDiv(){
    $(".span5").slideUp('fast');
    $("loged").slideDown('slow').attr('ng-hide','false');
} 