
// Note this doesn't assume students have learnt how to use plugin yet
// plugin should be learnt after students get more proficient
// since it will add how to get help for the commands as well.

/* Extensions 
 *    - add decoy blocks (some blocks near the hidden block but are not "it")
 *    - Put the block in the ground about 1 space
 */

'use strict';

var cwk = require('cwk');
var blocks = require('blocks');

var HIDDEN_BLOCK = blocks.prismarine;
var MIN_DISTANCE = 5; // adjust higher for harder
var MAX_DISTANCE = 10; // adjust higher for harder

// place the hidden block
command('hide1', function(parameters, player) {
  cwk.requireOp(player);

  var drone = new Drone(player);
  cwk.moveRandom(drone, MIN_DISTANCE, MAX_DISTANCE);
  drone.box(HIDDEN_BLOCK);
});


// update the distance from the block
// This doesn't stop after someone destroys the block
var utils = require('utils');
command('hide2', function(parameters, player) {
  var intervalId = -1;
  var hiddenLoc;

  cwk.requireOp(player);

  function update() {
    utils.players(function(who) {
      var distance = who.getLocation().distance(hiddenLoc);
      distance = Math.round(distance); 
      echo(who, "You are " + distance + " away.");
    });
  }

  var drone = new Drone(player);
  cwk.moveRandom(drone, MIN_DISTANCE, MAX_DISTANCE);
  hiddenLoc = drone.box(HIDDEN_BLOCK).getLocation();

  update(); // Send the first distance notification

  intervalId = setInterval(update, 5000);
});

// Add checking for block breaking and winning (and stopping)
command('hide3', function(parameters, player) {
  var intervalId = -1;
  var hiddenLoc;

  cwk.requireOp(player);

  function update() {
    utils.players(function(who) {
      var distance = who.getLocation().distance(hiddenLoc);
      distance = Math.round(distance); 
      echo(who, "You are " + distance + " away.");
    });
  }

  var drone = new Drone(player);
  cwk.moveRandom(drone, MIN_DISTANCE, MAX_DISTANCE);
  hiddenLoc = drone.box(HIDDEN_BLOCK).getLocation();

  update(); // Send the first distance notification

  intervalId = setInterval(update, 5000);

  events.blockBreak( function( event ) {

    if (event.getBlock().getLocation().equals(hiddenLoc))
    {
      cwk.playersMsg(event.getPlayer().getDisplayName() 
        + " won the game");
      clearInterval(intervalId);
      this.unregister(); // stop listening to blockBreak
    }
    else {
      echo(event.getPlayer(), "That wasn't the hidden block");
    }
  });
});

// finishing touches.
// - bring players together
// - put block 2 down (or more for harder...)
var events = require('events');
command('hide', function(parameters, player) {
	var intervalId = -1;
  var hiddenLoc;

  cwk.requireOp(player);

  function update() {

    utils.players(function(who) {
      var distance = who.getLocation().distance(hiddenLoc);
      distance = Math.round(distance); 
      echo(who, "You are " + distance + " away.");
    });
  }

  // Check to bring players together
  if (parameters.length > 0 && parameters[0] == "together") {
		utils.players(function(other) {
			other.teleport(player);
		});
  }

  var drone = new Drone(player);
  cwk.moveRandom(drone, MIN_DISTANCE, MAX_DISTANCE, 0);
  hiddenLoc = drone.box(HIDDEN_BLOCK).getLocation();

  update(); // Send the first distance notification

  intervalId = setInterval(update, 5000);

  events.blockBreak( function( event ) {

    if (event.getBlock().getLocation().equals(hiddenLoc))
    {
      cwk.playersMsg(event.getPlayer().getDisplayName() 
        + " won the game");
      clearInterval(intervalId);
      this.unregister(); // stop listening to blockBreak
    }
    else {
      echo(event.getPlayer(), "That wasn't the hidden block");
    }
  });
});