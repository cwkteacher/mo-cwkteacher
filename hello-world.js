'use strict';

var helloFunction = function( parameters, player ) {
  echo( player, 'Hello World');
}

command('hi', helloFunction);
