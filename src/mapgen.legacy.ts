import { Terrain } from './Terrain';
import { World } from './World';
import { randRange } from './randRange';

/*********************************/

// Sets up the canvas
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const c = canvas.getContext("2d");
const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const tileHeight = 2
const tileWidth = 2;

// Available Terrains
var terrains = [];
terrains.push(new Terrain("water", "#1437E4", .99, {min : 0.20, max : 0.43}, "water", 1));
terrains.push(new Terrain("warm waters", "#2344E6", 0.97, {max : 0.33}, "water", 1));
terrains.push(new Terrain("coral waters", "#1462E4", 0.97, {min : 0.05, max : 0.2}, "water", 1));
terrains.push(new Terrain("shallow waters", "#1C41F6", 0.97, {max : 0.3}, "water", 1));
terrains.push(new Terrain("tropical waters", "#0E60DC", 0.98, {max : 0.25}, "water", 1));
terrains.push(new Terrain("mountains", "#616A69", 0.85, {max : 0.1}, "land", 1));
terrains.push(new Terrain("dry hills", "#63e55f", 0.88, {max : 0.17}, "land", 1));
terrains.push(new Terrain("charaparal", "#DEDC5C", 0.89, {max : 0.24}, "land", 1));
terrains.push(new Terrain("lush plains", "#61d44f", 0.88, {max : 0.17}, "land", 1));
terrains.push(new Terrain("verdent plains", "#72e33a", 0.79, {min : 0.05, max : 0.19}, "land", 1));
terrains.push(new Terrain("plains", "#47c134", 0.99, {min : 0.15, max : 0.35}, "land", 1));
terrains.push(new Terrain("forest", "#33FF44",0.78, {min : 0.1, max : 0.35}, "land", 1));
terrains.push(new Terrain("thick forest", "#44ee33",0.95, {min : 0.07, max : 0.40}, "land", 1));
terrains.push(new Terrain("desert", "beige", 0.75, {max : 0.08},"land", 0.9));
terrains.push(new Terrain("tundra", "#221edd", 0.89, {min : 0.4, max : 0.45}, "land", 1));
terrains.push(new Terrain("icy waters", "434d7e", 0.9, {min : 0.43, max : 0.48},"water", 1));
terrains.push(new Terrain("ice caps", "white", 0.99, {min : 0.45, max : 0.5}, "water", 1));

if (!c) {
  throw new Error('Canvas #canvas not found');
}

var worldMap = new World(HEIGHT / tileHeight, WIDTH / tileWidth, tileWidth, tileHeight, terrains, c);

// Make the map!
clear(c);
for (var i = 0; i < 500; i++) {
	worldMap.generateMap(
		randRange(0, worldMap.rows - 1),
		randRange(0, worldMap.cols - 1));
}
worldMap.fill();

// Clears the canvas
function clear(c: CanvasRenderingContext2D) {
  c.fillStyle = "violet";
  c.fillRect(0, 0, WIDTH, HEIGHT);
}