var myApp = angular.module('myApp', ['ngRoute']);

//routes

myApp.config(function ($routeProvider) {
      $routeProvider

            .when('/', {
                  templateUrl: 'pages/home.html',
                  controller: 'myController'
            })
            .when('/blog', {
                  resolve:{


                        "check":function($location,$rootScope){
                              if(!$rootScope.stat){
                                    $location.path('/');
                                    alert("Login first!");
                              }
                        }
                  },
                  templateUrl: 'pages/forecast.html',
                  controller: 'forecastController'
            })

});



//LOGIN PAGE CONTROLLER
myApp.controller('myController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location, $rootScope) {

            $scope.mydata;
            $http.get("pages/aadmi.json")
              .then(function (response) {
                $scope.mydata = response.data.records;
                                        
            });
                                  
                                  
            $scope.submit = function () {
          
            angular.forEach($scope.mydata, function (item) {
                  // alert(item.email);  
                  if ((item.Email == $scope.Obj.username) && (item.Password == $scope.Obj.password)) {
                        $rootScope.stat = true;
                  }


            });
            $scope.Obj.username = "";
            $scope.Obj.password = "";
            if ($rootScope.stat) {
                  $location.path("/blog");
            }
            else {
                  alert("Try again!");
                  $location.path("/");
            }


      };
      $scope.Obj = {
            "username": "",
            "password": ""

      };
      



}]);



//BLOG PAGE CONTROLLER
myApp.controller('forecastController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope,$location) {

      
      $scope.submit= function(){
           $rootScope.stat= false;
           $location.path("/");
           

                                        };

}]);




