'use strict';

var cwk = require('cwk');
var utils = require('utils');

var whoIsIt;
var intervalId;
var gameTime;

function setPlayerIt(player) {
	echo(player, "TAG! You're IT!");
	cwk.equipArmor(player, "GOLD");
	whoIsIt = player.getDisplayName();
}

function update() {
	gameTime -= 5;
	if (gameTime == 0) {
		clearInterval(intervalId);
		utils.players(function(player) {
			player.sendTitle("Game over!", 
				whoIsIt + " LOST!", 
				10, 300, 20);
		});
	} 
	else {
		utils.players(function(player) {
			echo(player, gameTime + " secs left!");
		});
	}
}

command('tag', function(parameters, player) {

	gameTime = 60;

	var drone = new Drone(player);
	drone.arena(blocks.gold, 50, 10, 50);

	var players = utils.players(function(other) {
		other.teleport(player);	
		if (other.getGameMode() != "SURVIVAL") {
			echo(other, "You have to be in survival to play!");
		}
		else {
			cwk.stripArmor(other);
		}
	});

    var it = players[cwk.random(0, players.length-1)];
    setPlayerIt(it);

	cwk.pvpDamage(function(whoHit, whoWasHit, cancel) {
		if (whoHit.getDisplayName() == whoIsIt) {
			setPlayerIt(whoWasHit);
			cwk.stripArmor(whoHit);
    	}
		cancel();
	});

	intervalId = setInterval(update, 5000);
	update(); // Do the first update
});