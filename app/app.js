//Define an angular module for our app
var app = angular.module('shopApp', []);

app.controller('shopController', function($scope, $http) {
	
  var limit = 6;
  
  getItem(); // Load all available items 
  function getItem(){  
  $http.post("ajax/getItem.php").success(function(data){
        $scope.items = data;
        countItems();      
       });
  };
  
  
  function countItems(){  
     $http.get("ajax/countItems.php")
     .then(function(response){
          $scope.count = response.data;
          });
  };


  $scope.addItem = function (item) {
    if(limit > $scope.count) { // Add item only if limit hasn't reached
      $http.post("ajax/addItem.php?item="+item).success(function(data){
          getItem();
          $scope.itemInput = "";
        });
      } else { alert("You've reached the maximum amount of items ("+limit+")"); }
  };
  
  $scope.deleteItem = function (item) {
    if(confirm("Are you sure to delete this item?")){
    $http.post("ajax/deleteItem.php?itemID="+item).success(function(data){
        getItem();
      });
    }
  };

  $scope.clearItem = function () {
    if(confirm("Delete all checked items?")){
    $http.post("ajax/clearItem.php").success(function(data){
        getItem();
      });
    }
  };  

  $scope.changeStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/updateItem.php?itemID="+item+"&status="+status).success(function(data){
        getItem();
      });
  };

});
