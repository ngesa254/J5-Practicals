/**********************************************
  Controlling led with a button through firebase
  
 Ngesa N Marvin
**********************************************/

var five = require("johnny-five");
var Edison = require("edison-io");
var board = new five.Board({
  io: new Edison()
});

// connect to firebase
var myFirebaseRef = new Firebase("https://YOUR_FIREBASE.firebaseio.com/");

// button writes to firebase
board.on("ready", function () {
  
  var button = new five.Button(6);
  board.repl.inject({
    button: button
  });

	// pressing the button down
  button.on("down", function () {
    myFirebaseRef.child("button").set("down");
  });
	
// pressing the button up

  button.on("up", function () {
    myFirebaseRef.child("button").set("up");
  });

	// controlling the led
  var led = five.Led(13);
  led.on();
  myFirebaseRef.child("button").on("value", function(snap) {
    if(snap.val() == "down") {
      led.on();
    } else {
      led.off();
    }
  });
});
