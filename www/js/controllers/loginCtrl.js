/**
 * Created by chirag on 24/10/15.
 */
angular.module('starter.controllers')

    .controller('loginCtrl', function($scope, $ionicPopup, $timeout, $window, $location,$http, $cordovaDevice,$ionicPlatform,$cordovaSQLite,$ionicModal,$ionicLoading) {
      $scope.loginData.deviceId = window.localStorage['MeherDeviceId'];
      $scope.loginData.opt = null;

      $scope.showVerifyLoading = function() {
        $ionicLoading.show({
          template: '<p>Logging In...</p><ion-spinner></ion-spinner>',
          noBackdrop:true
        });
      };
      $scope.hideVerifyLoading = function(){
        $ionicLoading.hide();
      };


      if ($scope.loginData.mobile){
        $scope.otpRequested = true;
      }
      else {
        $scope.otpRequested = false;
      }

      if ( typeof window.localStorage['otp'] !== "undefined")
        $scope.otpRequested = true;
      else
        $scope.otpRequested = false;



      $scope.mobileAlert = function (title, str) {
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: str
        });
        alertPopup.then(function (res) {
        });
      };

      $scope.verifiedOtp = function() {
        if (window.localStorage['otp'] == $scope.loginData.opt) {
          $scope.sendStoreOPT();
        }
        else {
          $scope.mobileAlert('Incorrect OTP','Please enter correct OTP send in SMS');
        }
      };

      $scope.backToLogin = function() {
        $scope.loginData.mobile = null;
        $scope.otpRequested = !$scope.otpRequested;
      };

      $scope.sendOPT = function() {
        if (!$scope.loginData.mobile || $scope.loginData.mobile.length !== 10) {
          $scope.mobileAlert("Enter Mobile","plese enter 10 DIGIT mobile number");
        }
        else if(!$scope.loginData.categoty){
          $scope.mobileAlert("Select Category","Please Select you store category");
        }
        else {
          window.localStorage['retailerLoginData'] = JSON.stringify($scope.loginData);
          window.localStorage['otp'] = Math.floor(Math.random() * 9000) + 1000;
          //var msg = window.localStorage['otp'] +" is your OTP Code for Meher."+"\n"+" Order instantly from Meher.";
          var msg = window.localStorage['otp'] +" is your OTP code for Meher app";
          var mobile = $scope.loginData.mobile;

          //https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=919699999114&msg=123%20is%20your%20OTP%20code%20for%20Meher%20app&msg_type=TEXT&userid=2000141701&password=Gandhi007&auth_scheme=PLAIN

          var reqURL = 'https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=';
          reqURL += '91' + mobile + '&msg=' + encodeURI(msg);
          reqURL += '&msg_type=TEXT&userid=2000141701&password=Gandhi007&auth_scheme=PLAIN';

          console.log("&&&&&&&&&&&&&&&& -------- &&&&&&&&&&&&&& --------- &&&&&&&&&&&&&")
          console.log(reqURL)
          console.log("&&&&&&&&&&&&&&&& -------- &&&&&&&&&&&&&& --------- &&&&&&&&&&&&&")

          $http({
            url: reqURL,
            method: "GET"
          }).then(function(response) {
                // success
                //alert("SMS Send" +JSON.stringify(response));
                console.log(JSON.stringify(response));
              },
              function(response) { // optional
                // failed
                console.log(JSON.stringify(response));
                //alert("SMS not Send" +JSON.stringify(response));
              });

          $scope.loginData.opt = null;
          $scope.otpRequested = true;
        }
      };

      $scope.saveStore = function(store) {

        //alert(JSON.stringify(store));
        var query = "INSERT INTO Meher_store (_id, deviceId, name,created,closeTime,startTime,deliveryTime,deliveryDistance,mobile ,city, category ,address, loc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        //var query = "INSERT INTO Meher_store (_id,name,created,mobile,city,category,address,loc) VALUES (?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [store._id, store.deviceId,store.name,store.created,store.closeTime,store.startTime,store.deliveryTime,store.deliveryDistance,store.mobile,store.city,store.category ,store.address, JSON.stringify(store.loc)]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
          $location.url("/app/activeorders");
        }, function (err) {
          console.error(err);
        });
      };

      $scope.sendStoreOPT = function() {
        var tempLoginData = JSON.parse(window.localStorage['retailerLoginData'] || '{}');
        if (Object.keys(tempLoginData).length !==0)
          $scope.loginData= tempLoginData;
        if (tempLoginData)
        if(!$scope.loginData.mobile || !$scope.loginData.categoty)
          alert("please enter category & mobile number");
        else if (!window.localStorage['MeherDeviceId']){
          alert("Device ID not found. Please restart phone & try again");
        }
        else
        {
          window.localStorage['otp'] = null;
          if($scope.loginData.mobile.length !== 10)
            alert("plese enter 10 DIGIT mobile number");
          else {
            window.localStorage['meherShopCategory'] = $scope.loginData.categoty;
            $scope.showVerifyLoading ();
            console.log('http://getmeher.com:3000/'+$scope.loginData.categoty+'/mobile/' + $scope.loginData.mobile+'/'+window.localStorage['MeherDeviceId'])
            $http.get('http://getmeher.com:3000/'+$scope.loginData.categoty+'/mobile/' + $scope.loginData.mobile+'/'+window.localStorage['MeherDeviceId']).
            then(function (response) {
              console.log("&&^^^^B ^^^^^^^^ %%%%%%")
              console.log(response)
              $scope.hideVerifyLoading ();
              if(response.data){
                window.localStorage['meherRetailShop'] = JSON.stringify(response.data);
                $scope.saveStore(response.data);
                window.localStorage['otp'] = null;
              }else{
                alert("Please check Internet & make sure your Store is registered with MEHER");
                //alert(JSON.stringify(response));
                console.log(JSON.stringify(response));
                $scope.loginData.opt = null;
                $scope.otpRequested = false;
                $scope.hideVerifyLoading ();
                $scope.login();
                window.localStorage['otp'] = null;
              }
            }, function (response) {
              alert("Please check Internet & make sure your Store is registered with MEHER");
              alert(JSON.stringify(response));
              $scope.loginData.opt = null;
              $scope.otpRequested = false;
              window.localStorage['otp'] = null;
              $scope.hideVerifyLoading ();
              $scope.login();
            });
          }
        }
      };

      // Create the Register modal that we will use later
      $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function() {
        $scope.modal.hide();
        $scope.loginData.mobile = null;
      };

      // Open the login modal
      $scope.login = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        var body = JSON.stringify($scope.loginData);
        $window.location = "mailto:info@getmeher.com?subject=Add Store&body="+body;
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
      };

    });