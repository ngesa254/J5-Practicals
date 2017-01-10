
/*
  Blink
  
  This example code is in the public domain.

  modified 10 Jan 2017
  by Ngesa N Marvin
*/

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

board.on("ready", function() {
  var led = new five.Led(13);
  led.blink(1000);
  
});