'use strict';
var blocks = require("blocks");

function cake1(radius, layerHeight)
{
	this.cylinder(blocks.wool.red, radius, layerHeight);
}
require('drone').extend(cake1);

// Adds colors and icing
var cwk = require("cwk");
function cake2a(radius, layerHeight)
{
	var block = blocks.wool[cwk.randomColorKey()];
	this.cylinder(block, radius, layerHeight).up(layerHeight)
	// icing, make a smaller cylinder and offset and go back
	.fwd().right()
	.cylinder(blocks.stained_clay.white, radius-1, 1)
//	.left().back()
	.up();
}
require('drone').extend(cake2a);

// more complex - use this version if students are doing well on typing and keeping up
// You can decide to do this after the 2a version too if you like to show students
// how randomColorKey actually works.
// We use this version from here on but students can stay with the 2a version too
var colors = require("block-colors");
function cake2b(radius, layerHeight)
{
	// get an array of all the different colors
	var colorNames = Object.keys(colors);

	var colorIndex = Math.floor(Math.random()*colorNames.length);
	var colorKey = colorNames[colorIndex];
	var block = blocks.wool[colorKey];

	this.cylinder(block, radius, layerHeight)
	// icing, make a smaller cylinder and offset and go back
	.up(layerHeight).fwd().right()
	.cylinder(blocks.stained_clay.white, radius-1, 1)
	.left().back()
	.up();
}
require('drone').extend(cake2b);

// Add loops and flames
function cake3(radius, layers, layerHeight)
{
	// get an array of all the different colors
	var colorNames = Object.keys(colors);

	for (var i = 0; i<layers; i++) {
		var colorIndex = Math.floor(Math.random()*colorNames.length);
		var colorKey = colorNames[colorIndex];
		var block = blocks.wool[colorKey];

		this.cylinder(block, radius, layerHeight)
		// icing, make a smaller cylinder and offset and go back
		.up(layerHeight).fwd().right()
		.cylinder(blocks.stained_clay.white, radius-1, 1)
		.left().back()
		.up();
	}
	// topper
	this.fwd().right().cylinder(blocks.fire, radius-1, 1);
}
require('drone').extend(cake3);

// Add default parameters and save/restore the drone location so you 
// can cascade other things together with the cake and not be left
// up at the top of the cake for the next operation.
function cake(radius, layers, layerHeight)
{
	layers = cwk.udef(layers, 3);
	radius = cwk.udef(radius, 10);
	layerHeight = cwk.udef(layerHeight, 3);

	this.chkpt('cake'); // save drone starting position.

	// get an array of all the different colors
	var colorNames = Object.keys(colors);

	for (var i = 0; i<layers; i++) {
		var colorIndex = Math.floor(Math.random()*colorNames.length);
		var colorKey = colorNames[colorIndex];
		var block = blocks.wool[colorKey];

		this.cylinder(block, radius, layerHeight)
		// icing, make a smaller cylinder and offset and go back
		.up(layerHeight).fwd().right()
		.cylinder(blocks.stained_clay.white, radius-1, 1)
		.left().back()
		.up();
	}
	// topper
	this.fwd().right().cylinder(blocks.fire, radius-1, 1);
	
	this.move('cake'); // go back to start
}

require('drone').extend(cake);
