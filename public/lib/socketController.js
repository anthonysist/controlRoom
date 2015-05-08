(function() {
      angular.module('controlRoomApp')
		.controller('socketController', socketController);

      function socketController() {
            var socket = io.connect();
            socket.on('news', function(data) {
                  console.log(data);
                  socket.emit('my other event', {
                        my: 'data'
                  })
            });
      }
})();