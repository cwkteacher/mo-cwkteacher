/*
	Create a dance floor. 

	Progresses from initial version for glass flashing blocks
	through to a game that can be playerd for dancing on
	the lit up colored squares with scoring.

	jsp dance1 
	jsp dance2			// all tiles change color
	jsp dance3 [size]	// add glowstone floor and param for size
	jsp dance4 [size]	// changing to a single block to dance on
	jsp dance5 [size]	// look & play sound for player standing on block
	jsp dance [size]	// add backboard view & scoring
*/
'use strict';

var cwk = require('cwk');
command('dance1', function(parameters, player) {

	var drone = cwk.drone(player);

	drone.rand(blocks.rainbow, 3, 1, 3);
});

command('dance2', function(parameters, player) {

	var drone = cwk.drone(player);
	var duration = 30, intervalId;

	function updateFloor() {
		drone.rand(blocks.rainbow, 3, 1, 3);
		if (--duration == 0){
			// turn off the lights
			clearInterval(intervalId);
		}
	};

	intervalId = setInterval( updateFloor, 1000);
});

command('dance3', function(parameters, player) {

	var drone = cwk.drone(player);
	var duration = 30, size = 3, intervalId;

	function updateFloor() {
		drone.rand(blocks.rainbow, size, 1, size);
		if (--duration == 0 ){
			// turn off the lights
			clearInterval(intervalId);
		}
	};

	if (parameters.length > 0) size  = parseInt(parameters[0]);
	intervalId = setInterval( updateFloor, 1000);

	// Create a glow underneath the dance floor
	drone
		.down()
		.box( blocks.beacon, size, 1, size)
		.up();

});


command('dance4', function(parameters, player) {

	var drone = cwk.drone(player);
	var duration = 10, intervalId, size = 3;

	function updateFloor() {		
		drone
			.move('special')
			.box(blocks.stained_glass.white,1,1,1,true);

		if (--duration == 0){
			clearInterval(intervalId);
			return;
		}

		drone
			.move('dance')
			.right(cwk.random(0,size-1))
			.fwd(cwk.random(0,size-1))
			.chkpt('special')
			.rand(blocks.rainbow);

	}

	if (parameters.length > 0) size  = parseInt(parameters[0]);
	intervalId = setInterval(updateFloor, 3000);

	drone
		.down()
		.box( blocks.glowstone, size, 1, size)
		.up()
		.chkpt('dance')
		.box(blocks.stained_glass.white, size, 1, size);
});

// Look for player standing on block
var sounds = require("sounds");
var events = require('events');
command('dance5', function(parameters, player) {

	var drone = cwk.drone(player);
	var specialLoc, playerMove, duration = 10, intervalId, size = 3;

	function clearPrevious() {
		specialLoc = null;
		drone
			.move('special')
			.box(blocks.stained_glass.white,1,1,1,true);
	}

	function updateFloor() {
		var fwdSteps = cwk.random(0,size-1);
		var rightSteps = cwk.random(0,size-1);

		clearPrevious();

		if (--duration == 0){
			clearInterval(intervalId);
			playerMove.unregister();
			return;
		}

		drone
			.move('dance')
			.right(rightSteps)
			.fwd(fwdSteps)
			.chkpt('special')
			.rand(blocks.rainbow);

		specialLoc = drone.move('special').up().getLocation().getBlock();
	}

	playerMove = events.playerMove(function(event) {
		if (event.getPlayer().getName() != player.getName()) {
			return;	// not this players dance.
		}
		var playerLoc = event.getPlayer().getLocation().getBlock();
		if (playerLoc.equals(specialLoc)) {
			sounds.blockGlassBreak(player);			
			clearPrevious();
		}
	});

	if (parameters.length > 0) size  = parseInt(parameters[0]);
	intervalId = setInterval(updateFloor, 3000);

	// create the floor / create a glow underneath the dance floor
	drone
		.down()
		.box( blocks.glowstone, size, 1, size)
		.up()
		.chkpt('dance')
		.box(blocks.stained_glass.white, size, 1, size);
});

// add backboard, scoring
command('dance', function(parameters, player) {

	var drone = cwk.drone(player);
	var specialLoc, playerMove, turns = 10, score = 0, intervalId = null, size = 3;

	function clearPrevious() {
		specialLoc = null;

		drone
			.move('special')
			.box(blocks.stained_glass.white,1,1,1,true)
			.move('specialb')
			.box(blocks.stained_glass.white,1,1,1,true);
	}

	function updateFloor() {
		var colorBlock = blocks.rainbow[cwk.random(0,blocks.rainbow.length-1)];
		var fwdSteps = cwk.random(0,size-1);
		var rightSteps = cwk.random(0,size-1);

		clearPrevious();

		if (--turns == 0) {
			// finish playing before drawing new blocks.
			echo(player, "Game over! Your score was " + score + " out of 20");
			clearInterval(intervalId);
			specialLoc = null;
			playerMove.unregister();
			return;
		}

		drone
			.move('dance')
			.right(rightSteps)
			.fwd(fwdSteps)
			.chkpt('special')
			.box(colorBlock,1,1,1,true)
			.move('danceboard')
			.right(rightSteps)
			.up(fwdSteps)	
			.chkpt('specialb')
			.box(colorBlock,1,1,1,true);

		specialLoc = drone.move('special').up().getLocation().getBlock();
	}

	playerMove = events.playerMove(function(event) {
		if (event.getPlayer().getName() != player.getName()) {
			return;	// not this players dance.
		}
		var playerLoc = event.getPlayer().getLocation().getBlock();

		if (playerLoc.equals(specialLoc)) {
			sounds.blockGlassBreak(player);			
			clearPrevious();
			score++;
		}
	});

	if (parameters.length > 0) size  = parseInt(parameters[0]);
	intervalId = setInterval(updateFloor, 3000);

	// create the floor / create a glow underneath the dance floor
	drone
		.down()
		.box(blocks.glowstone, size, 1, size)
		.up()
		.chkpt('dance')
		.box(blocks.stained_glass.white, size, 1, size)
		.fwd(size+1)
		.up(1)
		.chkpt('danceboard')
		.box(blocks.stained_glass.white, size, size, 1);

	updateFloor();
});
