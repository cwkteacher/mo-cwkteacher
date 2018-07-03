var i;


command( 'mofarm', function ( parameters, player ) {
var theDrone = new Drone(player);
theDrone.up();
theDrone.chkpt('start');
var timeoutStop = new Date().getTime()+500;
  theDrone.chkpt('start');
  // Build the wall all around
  for (var count = 0; count < 2; count++) {
    theDrone.box0('110',20,1,20);
    theDrone.up();
  }
  theDrone.move('start');
  theDrone.right();
  // Remove a section for an entryway.
  theDrone.box(0,3,2,1);
  theDrone.move('start');
  theDrone.down();
  // Go down down into the earth one block to build the
  // floor. (remember to go back after building this.
  theDrone.box ('24',20,1,20);
  theDrone.move('start');
  for (var count2 = 0; count2 < 2; count2++) {
    // Move inside border for the fences.
    theDrone.fwd();
    theDrone.right();
  }
  for (var count4 = 0; count4 < 4; count4++) {
    theDrone.box0('85',6,1,6);
    for (var count3 = 0; count3 < 15; count3++) {
      theDrone.fwd();
    }
    theDrone.turn();
  }
  for (var count5 = 0; count5 < 2; count5++) {
    // Move inside the fence for the animals
    theDrone.fwd();
    theDrone.right();
  }
  for (i = 1; i <= 4; i++) {
    if (i == 1) {
      if (__plugin.bukkit) {
              theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType.CHICKEN);
          }
          if (__plugin.canary) {
              var Canary = Packages.net.canarymod.Canary,
                  entityInstance = Canary.factory().entityFactory.newEntity('CHICKEN', theDrone.getLocation());
              entityInstance.spawn();
          }} else if (i == 2) {
      if (__plugin.bukkit) {
              theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType.PIG);
          }
          if (__plugin.canary) {
              var Canary = Packages.net.canarymod.Canary,
                  entityInstance = Canary.factory().entityFactory.newEntity('PIG', theDrone.getLocation());
              entityInstance.spawn();
          }} else if (i == 3) {
      if (__plugin.bukkit) {
              theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType.SHEEP);
          }
          if (__plugin.canary) {
              var Canary = Packages.net.canarymod.Canary,
                  entityInstance = Canary.factory().entityFactory.newEntity('SHEEP', theDrone.getLocation());
              entityInstance.spawn();
          }if (__plugin.bukkit) {
              theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType.SHEEP);
          }
          if (__plugin.canary) {
              var Canary = Packages.net.canarymod.Canary,
                  entityInstance = Canary.factory().entityFactory.newEntity('SHEEP', theDrone.getLocation());
              entityInstance.spawn();
          }} else {
      if (__plugin.bukkit) {
              theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType.COW);
          }
          if (__plugin.canary) {
              var Canary = Packages.net.canarymod.Canary,
                  entityInstance = Canary.factory().entityFactory.newEntity('COW', theDrone.getLocation());
              entityInstance.spawn();
          }if (__plugin.bukkit) {
              theDrone.getLocation().world.spawnEntity(theDrone.getLocation(), org.bukkit.entity.EntityType.COW);
          }
          if (__plugin.canary) {
              var Canary = Packages.net.canarymod.Canary,
                  entityInstance = Canary.factory().entityFactory.newEntity('COW', theDrone.getLocation());
              entityInstance.spawn();
          }}
    // Don't move past the inside of the next enclosure. Total distance
    // from one edge fence to the other is 15 so being 2 inside
    // the fence already means if you move 11 you will be 2
    // blocks back from the edge of the next fence (11 + 2 = 13).
    for (var count6 = 0; count6 < 11; count6++) {
      theDrone.fwd();
    }
    theDrone.turn();
  }
});
var inventory = require('inventory');
var items = require('items');
command( 'mo-farm-feed', function ( parameters, player ) {
var theInventory = new inventory(player);
var timeoutStop = new Date().getTime()+500;
  for (var count7 = 0; count7 < 10; count7++) {
    theInventory.add(items.wheat(1));
  }
});