var five = require("../lib/johnny-five.js"),
  fsr, led;

(new five.Board()).on("ready", function() {



    var express = require('express');
    var app = express();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    var path = require('path');
    var cors = require('cors');



    server.listen(3000);

    //SITE STUFF///////////
// Request headers you wish to allow




    app.use("/public", express.static(path.join(__dirname, 'public')));
    app.use("/server", express.static(path.join(__dirname, 'server')));


    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/public/index.html');
    });

    app.get('/master', function (req, res) {

        res.sendfile(__dirname + '/public/views/masterView.html');
    });

    app.get('/map', function (req, res) {

        res.sendfile(__dirname + '/public/views/mapView.html');
    });


    io.on('connection', function (socket) {
        // Create a new `fsr` hardware instance.
        fsr = new five.Sensor({
            pin: "A0",
            freq: 25
        });

        led = new five.Led(9);

        var pressureData;
        var pressed = 0;
        // Scale the sensor's value to the LED's brightness range
        fsr.scale([0, 255]).on("data", function() {

            if(this.value == 0){
                console.log("no one is touching me");
            }

            if(this.value > 1 ) {

                if(pressed == 0) {
                    socket.emit('sensor', this.value);
                    console.log("oh baby.... keep touching me.");
                    pressed = 1;
                }


            }
            // set the led's brightness based on force
            // applied to force sensitive resistor

            led.brightness(this.value);

            pressureData = this.value;



        });


    });
  });

