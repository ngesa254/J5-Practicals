var five = require("johnny-five"),
  board, button;
var Firebase = require("firebase");

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(4);
  var led = new five.Led(12);
	var myFirebaseRef = new Firebase("https://firesketch-3b3e0.firebaseio.com/");

  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
		myFirebaseRef.set("down");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
		myFirebaseRef.set("up");
  });



	myFirebaseRef.on("value", function(snapshot) {
		var buttonState = snapshot.val(); 
	  if(buttonState == "down") {
		  led.on();
		} else {
		  led.off();
		}
	});
});