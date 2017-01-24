/*
  Controlling led with a button through firebase
  
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

  // Create a new `button` hardware instance.
 
  var button = new five.Button(13);
  var led = new five.Led(12);
	var myFirebaseRef = new Firebase("https://YOUR_FIREBASE.firebaseio.com/");

  // pressing the button down
  button.on("down", function() {
    console.log("down");
		myFirebaseRef.set("down");
  });

  //releasing the button
  button.on("up", function() {
    console.log("up");
		myFirebaseRef.set("up");
  });

// Controlling the led

	myFirebaseRef.on("value", function(snapshot) {
		var buttonState = snapshot.val(); 
	  if(buttonState == "down") {
		  led.on();
		} else {
		  led.off();
		}
	});
});
