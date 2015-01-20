// Clears the canvas
function clear() {
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, WIDTH, HEIGHT);
}

/*********************************/


// Sets up the canvas
var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d"),
    HEIGHT = canvas.height,
    WIDTH = canvas.width,
    tileHeight = 10,
    tileWidth = 10;

// Available Terrains
var terrains = [];
terrains.push(new Terrain("water", "#0000FF"));
terrains.push(new Terrain("mountains", "#364411"));
terrains.push(new Terrain("forest", "#33FF44"));

var worldMap = new World(HEIGHT / tileHeight, WIDTH / tileWidth, tileWidth, tileHeight, terrains, c);

// Make the map!
clear();
worldMap.generateMap();