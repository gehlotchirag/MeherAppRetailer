

angular.module('starter.controllers')

    .controller('creditsCtrl', function($scope,$http,$cordovaSQLite,$cordovaSms,$cordovaSocialSharing) {

      //$scope.referalCount = 0;
      //$scope.referalCredits = 10 * $scope.referalCount;
      $scope.storeMobile;
      $scope.storeName;
      $scope.custMobile;

      $scope.checkDB = function(deviceId) {
        //alert(deviceId);
        var query = "SELECT * FROM Meher_store WHERE deviceId = ?";
        $cordovaSQLite.execute(db,query,[deviceId]).then(function(result) {
          if(result.rows.length > 0) {
            $scope.storeMobile =result.rows.item(0).mobile;
            $scope.storeName = result.rows.item(0).name;
            $scope.getReferalCount($scope.storeMobile);
          } else {
            alert("Not registered !");
          }
        }, function(error) {
          console.error(error);
        });
      };

      $scope.getReferalCount = function(referedBy){
        $http({
          method: 'GET',
          url: 'http://getmeher.com:3000/consumers-referral/'+referedBy
        }).then(function successCallback(response) {
          //alert(response.data);
            $scope.referalCount = response.data;
        }, function errorCallback(response) {

        });
      };

        $scope.checkDB (window.localStorage['MeherDeviceId']);

      $scope.sendWhatsApp = function() {
        var storeName = $scope.storeName;
        var storeMobile = $scope.storeMobile;

        var msg = storeName +" has suggested you to order using Meher app to get instant home delivery. Use referral code "+storeMobile+". Download app now";

        $cordovaSocialSharing
            .shareViaWhatsApp(msg, null, "https://goo.gl/cxqKEc")
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occurred. Show a message to the user
            });
      }


      $scope.sendRef = function(mobile){
        var storeName = $scope.storeName;
        var storeMobile = $scope.storeMobile;

        var msg = storeName +" has suggested you to order using Meher app to get instant home delivery. Use referral code "+storeMobile+". Download app now https://goo.gl/cxqKEc";

        //var reqURL = 'https://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=';
        //reqURL += '91' + mobile + '&msg=' + encodeURI(msg);
        //reqURL += '&msg_type=TEXT&userid=2000141701&password=Gandhi007&auth_scheme=PLAIN';
        //
        //alert("SMS text" +JSON.stringify(reqURL));

        var options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
          }
        };

        $cordovaSms
            .send(mobile, msg, options)
            .then(function() {
                      //alert("SMS Send");

              // Success! SMS was sent
            }, function(error) {
              // An error occurred
                      alert("SMS not Send");

            });


        //  $http({
      //    url: reqURL,
      //    method: "GET"
      //  }).then(function(response) {
      //        // success
      //        alert("SMS Send" +JSON.stringify(response));
      //        console.log(JSON.stringify(response));
      //        //alert("Message sent !");
      //        $scope.custMobile = null;
      //      },
      //      function(response) { // optional
      //        // failed
      //        $scope.downloadSMS = null;
      //        console.log(JSON.stringify(response));
      //        alert("SMS not Send");
      //      });
      //
      //
      }

    });
