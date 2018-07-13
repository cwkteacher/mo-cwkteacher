'use strict';

var inventory = require('inventory');
var utils = require('utils');

exports.giveAll = function(item, count)
{
	// gives every player the item, count times.
	utils.players(function(player){
	  inventory(player).add(item(count));
	});
}