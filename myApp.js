var myApp = angular.module("myApp", [ 'ngRoute']);



/**
 * Configure the Routes
 */
myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html", controller: "PageCtrl"})  
    .when("/customers", {templateUrl: "partials/customers.html", controller: "PageCtrl"})  
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);




myApp.controller('customersController',function($scope,$http) {
        $http.get("http://www.w3schools.com/website/Customers_JSON.php")
    .success(function(response) {$scope.names = response;});
    
    $scope.editName = function()
    {
	console.log('DEBUG ');
	console.log($scope);
	};
});




/**
 * Controls the Blog
 */
myApp.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
myApp.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");
});