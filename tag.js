'use strict';

var cwk = require('cwk');
var utils = require('utils');

var PLAYER = 0, FROZEN = 1, IT = 2;
var playerStates = {};	// initial empty object

function getPlayerState(player) {
	return playerStates[player.getDisplayName()];
}

// if no one is a PLAYER anymore than we have a winner
function didWin()
{
	for (var player in playerStates) {
		if (playerStates[player] == PLAYER) return false;
	}
	return true;
}

function setPlayerState(player, state) {
	playerStates[player.getDisplayName()] = state;
	if (state == IT) {
		echo(player, "TAG! You're IT!");
		cwk.equipArmor(player, "GOLD");
	}
	else if (state == FROZEN) {
		cwk.equipArmor(player, "DIAMOND");
	}
	else {
		cwk.stripArmor(player);
	}
}

command('tag', function(parameters, player) { 
	var drone = new Drone(player);
	drone.arena(blocks.diamond, 50, 10, 50);

	var players = utils.players(function(other) {
		other.teleport(player);	
		if (other.getGameMode() != "SURVIVAL") {
			echo(other, "You have to be in survival to play!");
		}
		else {
			setPlayerState(other, PLAYER);
		}
	});

    var it = players[cwk.random(0, players.length-1)];
    setPlayerState(it, IT);

	events.playerMove( function(e) { 
		if (getPlayerState(e.getPlayer()) == FROZEN) {
			// if frozen set to to from and allow look around
			var to = e.getFrom();
			to.setPitch(e.getTo().getPitch());
			to.setYaw(e.getTo().getYaw());
			e.setTo(to); 
		}
	});

	cwk.pvpDamage(function(whoHit, whoWasHit, cancel) {

		if (getPlayerState(whoWasHit) == FROZEN 
			&& getPlayerState(whoHit) == PLAYER) 
		{
			setPlayerState(whoWasHit, PLAYER);
		}
		else if (getPlayerState(whoWasHit) == PLAYER
			&& getPlayerState(whoHit) == IT) 
		{
			setPlayerState(whoWasHit, FROZEN);

			if (didWin()) {
				utils.players(function(player) {
					player.sendTitle("Game over!", 
					whoHit.getDisplayName() + " WON!", 
					10, 300, 20);
				// can do this if you want everyone back to normal straight away
				// setPlayerState(player, PLAYER);
				});
				playerStates = {};
			} 
		}
		cancel();
	});
});
