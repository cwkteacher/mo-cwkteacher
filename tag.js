'use strict';

var cwk = require('cwk');
var utils = require('utils');

command('tag', function(parameters, player) {

	var drone = new Drone(player);
	drone.arena(blocks.gold, 50, 10, 50);
});
