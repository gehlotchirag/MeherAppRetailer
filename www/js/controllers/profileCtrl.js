

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


    });
