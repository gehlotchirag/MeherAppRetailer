/**
 * Created by chirag on 24/10/15.
 */
angular.module('starter.controllers')
    .controller('shareCtrl', function($scope,$cordovaSocialSharing) {
      var message="Get daily need products from nearby stores instantly.Download Meher app now https://goo.gl/cxqKEc";
      var link = "https://goo.gl/cxqKEc";

      $scope.whatsappShare=function(){
        $cordovaSocialSharing
            .shareViaWhatsApp("hi", null, 'https://play.google.com/store/apps/details?id=com.meherapp.meher')
            .then(function(result) {
              // Success!
              alert("done")
            }, function(err) {
              // An error occurred. Show a message to the user
              alert(err)
            });
      };
      $scope.whatsappShare=function() {
        $cordovaSocialSharing
            .share(message, subject, file, link) // Share via native share sheet
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occured. Show a message to the user
            });
      }
      $scope.twitterappShare=function() {
        $cordovaSocialSharing
            .shareViaTwitter(message, image, link)
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occurred. Show a message to the user
            });
      }

      $scope.whatsappShare=function() {

        $cordovaSocialSharing
            .shareViaWhatsApp(message, image, link)
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occurred. Show a message to the user
            });
      }
      $scope.whatsappShare=function() {

        $cordovaSocialSharing
            .shareViaFacebook(message, image, link)
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occurred. Show a message to the user
            });
      }
      // access multiple numbers in a string like: '0612345678,0687654321'
      $scope.whatsappShare=function() {
        $cordovaSocialSharing
            .shareViaSMS(message, number)
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occurred. Show a message to the user
            });
      }
// toArr, ccArr and bccArr must be an array, file can be either null, string or array
      $scope.whatsappShare=function() {

        $cordovaSocialSharing
            .canShareVia(socialType, message, image, link)
            .then(function (result) {
              // Success!
            }, function (err) {
              // An error occurred. Show a message to the user
            });
      }
    });