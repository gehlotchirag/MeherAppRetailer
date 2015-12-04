

angular.module('starter.controllers')

    .controller('profileCtrl', function($scope,$http,$ionicPopup,$location) {

      $scope.profileData = JSON.parse(window.localStorage['meherRetailShop']);
      if (!$scope.profileData)
        $location.path('/app/login');
      $scope.tempDeliveryDistance;
      $scope.valueTempDeliveryDistance;
      if ($scope.profileData.deliveryDistance == 0.5)
        $scope.tempDeliveryDistance =0;
      else
        $scope.tempDeliveryDistance = $scope.profileData.deliveryDistance;

      $scope.processDistance= function(changedDistance){
        if( changedDistance == 0) {
          $scope.profileData.deliveryDistance=0.5;
        }
        else{
          $scope.profileData.deliveryDistance= changedDistance;
        }
        console.log($scope.profileData.deliveryDistance)
      }

      $scope.showConfirm = function() {
        $ionicPopup.confirm({
          title: 'Conformation of details',
          template: 'Are you sure you want to save changes?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.clicked = function(){
        alert("Clicked");
      };

      //$http({
      //  method: 'GET',
      //  // url: 'http://example.com',
      //  url: 'https://api.myjson.com/bins/1tpaf'
      //}).then(function successCallback(response) {
      //  // alert("Data Found")
      //  $scope.profileData=response.data;
      //  if ($scope.profileData.deliveryDistance == 0.5)
      //    $scope.tempDeliveryDistance =0;
      //  else
      //    $scope.tempDeliveryDistance = $scope.profileData.deliveryDistance;
      //  /*
      //   $scope.tempDeliveryDistance =parseInt($scope.profileData.deliveryDistance);
      //   if( $scope.tempDeliveryDistance==0) {
      //   $scope.valueTempDeliveryDistance=0.5;
      //   }
      //   else{
      //   $scope.valueTempDeliveryDistance= $scope.tempDeliveryDistance;
      //   }
      //   console.log($scope.tempDeliveryDistance)
      //   */
      //}, function errorCallback(response) {
      //  alert("Data not Found");
      //  // called asynchronously if an error occurs
      //  // or server returns response with an error status.
      //});

    });
