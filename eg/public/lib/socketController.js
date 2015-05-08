(function() {
      angular.module('controlRoomApp')
		.controller('socketController', socketController);

    socketController.$inject = ['$scope'];

      function socketController($scope) {
            var socket = io.connect();
          console.log('socket activates')
            socket.on('sensor', function(data) {
                  console.log(data);
                  $scope.screen = "Google Analytics";
                $scope.$apply();
                console.log($scope);
            });
      }
})();