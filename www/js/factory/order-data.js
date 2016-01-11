/**
 * Created by chirag on 18/09/15.
 */
angular.module('starter.controllers')

    .factory('OrderData', function () {

      var OrderData = {};
      return {
        getOrder: function () {
          return OrderData;
        },
        setOrder: function (OrderInfo) {
          angular.copy(OrderInfo,OrderData);
          return OrderData;
        }
      };
    });
