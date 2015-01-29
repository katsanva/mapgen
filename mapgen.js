// Clears the canvas
function clear() {
  c.fillStyle = "#FFFFFF";
  c.fillRect(0, 0, WIDTH, HEIGHT);
}

// Returns a random range
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*********************************/


// Sets up the canvas
var canvas = document.getElementById("canvas"),
  c = canvas.getContext("2d"),
  HEIGHT = canvas.height,
  WIDTH = canvas.width,
  tileHeight = 2,
  tileWidth = 2;

// Available Terrains
var terrains = [];
terrains.push(new Terrain("water", "#1c2d81", 0.99, {min : 0.20, max : 0.43}));
terrains.push(new Terrain("tropical waters", "#324396", 0.98, {max : 0.25}));
terrains.push(new Terrain("mountains", "#364411", 0.55, {max : 0.1}));
terrains.push(new Terrain("charaparal", "coral", 0.7, {max : 0.24}));
terrains.push(new Terrain("lush plains", "#61d44f", 0.88, {max : 0.17}));
terrains.push(new Terrain("plains", "#47c134", 0.87, {min : 0.15, max : 0.37}));
terrains.push(new Terrain("forest", "#33FF44",0.6, {min : 0.1, max : 0.40}));
terrains.push(new Terrain("desert", "beige", 0.75, {max : 0.08}));
terrains.push(new Terrain("tundra", "#221edd", 0.89, {min : 0.4, max : 0.5}));
terrains.push(new Terrain("icy waters", "434d7e", 0.9, {min : 0.43, max : 0.5}));
terrains.push(new Terrain("ice caps", "white", 0.99, {min : 0.47, max : 0.5}));

var worldMap = new World(HEIGHT / tileHeight, WIDTH / tileWidth, tileWidth, tileHeight, terrains, c);

// Make the map!
clear();
for (var i = 0; i < 3500; i++) {
	worldMap.generateMap();
}