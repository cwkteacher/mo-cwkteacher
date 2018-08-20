'use strict';

var cwk = require('cwk');
var utils = require('utils');
var whoIsIt;

function setPlayerIt(player) {
	echo(player, "TAG! You're IT!");
	cwk.equipArmor(player, "GOLD");
	whoIsIt = player.getDisplayName();
}

command('tag', function(parameters, player) {

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
});