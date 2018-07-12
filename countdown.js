'use strict';
/*************************************************************************
### Drone.countdown() method.

Constructs a large LCD Clock. The clock will display the current time of day.
The clock can be stopped by calling the stopLCD() method of the Drone which created the clock.

#### Parameters

 * fromSecs (Optional - number of seconds for countdown, default is 10)

#### Example

At the in-game prompt you can create a countdown by looking at a block and typing:

```javascript
/js var timer = countdown()
/js timer.stopCountdown()
```

Alternatively you can create a new Drone object from a Player or Location object and call the countdown() method.

```javascript
var d = new Drone(player);
d.countdown();
d.stopCountdown();
```
***/

var blocks = require('blocks');

// Just get the blocktype working
function countdown1(){
  var drone = this;
  var secs = 9;

  drone.blocktype(secs, blocks.glowstone, blocks.wool.black, true);
}
require('drone').extend(countdown1);
 
// Get a countdown working from 10 - have students 
// change it > 10 and see what happens
function countdown2(){
  var intervalId = -1;
  var drone = this;
  var secs = 10;

  var update = function() {
    secs--;
    drone.blocktype(secs, blocks.glowstone, blocks.wool.black, true);
    if (secs <= 0) clearInterval(intervalId);
  }

  intervalId = setInterval(update, 1000);
  update(); // Do the first update
}
require('drone').extend(countdown2);

// Add padding and passing in starting secs and set default of 10
function countdown3(fromSecs){
  var intervalId = -1;
  var drone = this;
  var fromSecs = require('cwk').udef(fromSecs, 10);
  var secs = fromSecs + 1; // Timer decrements immediately so we add 1
  var pad = fromSecs.toString().length;

  var update = function() {
    secs--;
    drone.blocktype(secs.pad(pad), 
      blocks.glowstone, blocks.wool.black, true);
    if (secs <= 0) clearInterval(intervalId);
  }

  intervalId = setInterval(update, 1000);
  update(); // Do the first update
}
require('drone').extend(countdown3);

// Add a finished countdown message and ability to stop countdown
// from command line.
function countdown(fromSecs){
  var intervalId = -1;
  var drone = this;
  var fromSecs = require('cwk').udef(fromSecs, 10);
  var pad = fromSecs.toString().length;
  var secs = fromSecs + 1;

  var update = function() {
    secs--;
    drone.blocktype(secs.pad(pad), blocks.glowstone, blocks.wool.black, true);
    if (secs <= 0) drone.stopCountdown();
  }

  var sendPlayerMessage = function(player) {
      echo(player, fromSecs + " second countdown ended.");
  }

  drone.stopCountdown = function(){
    clearInterval(intervalId);
    require('utils').players().forEach(sendPlayerMessage);
    drone.box(blocks.air, pad * 4 + 1, 7, 1);
 };

  intervalId = setInterval(update, 1000);
  update(); // Do the first update
}
require('drone').extend(countdown);
