var myApp = angular.module("myApp",["ngResource", "ngRoute"]);

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
     .when("/todos", {templateUrl: "partials/todos.html", controller: "PageCtrl"})    
     .when("/recipes", {templateUrl: "partials/recipes.html", controller: "PageCtrl"})  
    // else 404
    .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);


// Recipes
myApp.factory('Recipes', function ($resource) {
    "use strict";
    return $resource('https://dsp-markmorgan.cloud.dreamfactory.com:443/rest/db/Recipes/:id/?app_name=groceryShopper&fields=*', {}, { update: { method: 'PUT' }, query: {
        method: 'GET',
        isArray: false
    } });
});

var RecipesCtrl = function ($scope, Recipes) {
  console.log('loading recipes');
      $scope.Recipes = Recipes.get();
    console.log($scope.Recipes);
};





// Ingredients


// Todo from Dreamfactory Services Platform
myApp.factory('Todo', function ($resource) {
    "use strict";
    return $resource('https://dsp-markmorgan.cloud.dreamfactory.com:443/rest/db/todo/:id/?app_name=todoangular&fields=*', {}, { update: { method: 'PUT' }, query: {
        method: 'GET',
        isArray: false
    } });
});



var TodoCtrl = function ($scope, Todo) {
    "use strict";
    $scope.action="Add";
    $scope.Todos = Todo.get();
    console.log('TO DO LIST LOADING');
    console.log( $scope.Todos);
    $scope.addItem = function(){
        $scope.todo.complete = false;
        Todo.save($scope.todo, function(data){
            $scope.Todos.record.push(data);
            $scope.todo={};
        });

    }
    $scope.updateItem = function () {
        var todo = this.todo;

        if(this.todo.complete === false){
            this.todo.complete = true;
        }else{
            this.todo.complete = false;
        }
        $('#item_' + todo.id).toggleClass('strike');
        Todo.update({id:todo.id}, todo, function () {
            updateByAttr($scope.Todos.record, 'id', todo.id, todo);

        });
    };
    $scope.deleteItem = function(){

        var id = this.todo.id;
        Todo.delete({ id:id }, function () {
            $("#row_" + id).fadeOut();
        });
    }
var updateByAttr = function(arr, attr1, value1, newRecord){
        if(!arr){
            return false;
        }
        var i = arr.length;
        while(i--){
            if(arr[i] && arr[i][attr1] && (arguments.length > 2 && arr[i][attr1] === value1 )){
                arr[i] = newRecord;
            }
        }
        return arr;
    };

};

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