(function() {
      angular.module('controlRoomApp')
		.controller('socketController', socketController);

    socketController.$inject = ['$scope'];

      function socketController($scope) {
            var socket = io.connect();
          console.log('socket activates')
            socket.on('sensorOne', function(data) {
                  console.log(data);
                  $scope.screen = "Sensor One Pressed!";
                $scope.$apply();
                console.log($scope);
            });

          socket.on('sensorTwo', function(data) {
              console.log(data);
              $scope.screen = "Sensor Two Pressed!";
              $scope.$apply();
              console.log($scope);
          });

      }
})();