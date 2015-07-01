// Clears the canvas
function clear() {
  c.fillStyle = "violet";
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
terrains.push(new Terrain("water", "#1c2d81", .99, {min : 0.20, max : 0.43}, "water", 1));
terrains.push(new Terrain("warm waters", "#1d2d93", 0.97, {max : 0.33}, "water", 1));
terrains.push(new Terrain("coral waters", "#0e1f88", 0.97, {min : 0.05, max : 0.2}, "water", 1));
terrains.push(new Terrain("shallow waters", "#0f0e99", 0.97, {max : 0.3}, "water", 1));
terrains.push(new Terrain("tropical waters", "#324396", 0.98, {max : 0.25}, "water", 1));
terrains.push(new Terrain("mountains", "#364411", 0.55, {max : 0.1}, "land", 1));
terrains.push(new Terrain("dry hills", "#63e55f", 0.78, {max : 0.17}, "land", 1));
terrains.push(new Terrain("charaparal", "coral", 0.7, {max : 0.24}, "land", 1));
terrains.push(new Terrain("lush plains", "#61d44f", 0.88, {max : 0.17}, "land", 1));
terrains.push(new Terrain("verdent plains", "#72e33a", 0.79, {min : 0.05, max : 0.19}, "land", 1));
terrains.push(new Terrain("plains", "#47c134", 0.87, {min : 0.15, max : 0.37}, "land", 1));
terrains.push(new Terrain("forest", "#33FF44",0.6, {min : 0.1, max : 0.40}, "land", 1));
terrains.push(new Terrain("thick forest", "#44ee33",0.85, {min : 0.07, max : 0.41}, "land", 1));
terrains.push(new Terrain("desert", "beige", 0.75, {max : 0.08},"land", 0.9));
terrains.push(new Terrain("tundra", "#221edd", 0.89, {min : 0.4, max : 0.46}, "land", 1));
terrains.push(new Terrain("icy waters", "434d7e", 0.9, {min : 0.43, max : 0.48},"water", 1));
terrains.push(new Terrain("ice caps", "white", 0.99, {min : 0.45, max : 0.5}, "water", 1));

var worldMap = new World(HEIGHT / tileHeight, WIDTH / tileWidth, tileWidth, tileHeight, terrains, c);

// Make the map!
clear();
for (var i = 0; i < 500; i++) {
	worldMap.generateMap(
		randRange(0, worldMap.rows - 1),
		randRange(0, worldMap.cols - 1));
}
worldMap.fill();