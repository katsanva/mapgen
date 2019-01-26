import { Terrain } from './Terrain';
import { World } from './World';
import { randRange } from './randRange';
import { TerrainType } from './TerrainType.enum';

/*********************************/

// Sets up the canvas
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');
const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const tileHeight = 2;
const tileWidth = 2;

// Available Terrains
const terrains: Terrain[] = [];
terrains.push(new Terrain('water', '#1437E4', 0.99, { min: 0.2, max: 0.43 }, TerrainType.Water, 1));
terrains.push(new Terrain('warm waters', '#2344E6', 0.97, { max: 0.33 }, TerrainType.Water, 1));
terrains.push(new Terrain('coral waters', '#1462E4', 0.97, { min: 0.05, max: 0.2 }, TerrainType.Water, 1));
terrains.push(new Terrain('shallow waters', '#1C41F6', 0.97, { max: 0.3 }, TerrainType.Water, 1));
terrains.push(new Terrain('tropical waters', '#0E60DC', 0.98, { max: 0.25 }, TerrainType.Water, 1));
terrains.push(new Terrain('mountains', '#616A69', 0.85, { max: 0.1 }, TerrainType.Land, 1));
terrains.push(new Terrain('dry hills', '#63e55f', 0.88, { max: 0.17 }, TerrainType.Land, 1));
terrains.push(new Terrain('charaparal', '#DEDC5C', 0.89, { max: 0.24 }, TerrainType.Land, 1));
terrains.push(new Terrain('lush plains', '#61d44f', 0.88, { max: 0.17 }, TerrainType.Land, 1));
terrains.push(new Terrain('verdent plains', '#72e33a', 0.79, { min: 0.05, max: 0.19 }, TerrainType.Land, 1));
terrains.push(new Terrain('plains', '#47c134', 0.99, { min: 0.15, max: 0.35 }, TerrainType.Land, 1));
terrains.push(new Terrain('forest', '#33FF44', 0.78, { min: 0.1, max: 0.35 }, TerrainType.Land, 1));
terrains.push(new Terrain('thick forest', '#44ee33', 0.95, { min: 0.07, max: 0.4 }, TerrainType.Land, 1));
terrains.push(new Terrain('desert', 'beige', 0.75, { max: 0.08 }, TerrainType.Land, 0.9));
terrains.push(new Terrain('tundra', '#221edd', 0.89, { min: 0.4, max: 0.45 }, TerrainType.Land, 1));
terrains.push(new Terrain('icy waters', '434d7e', 0.9, { min: 0.43, max: 0.48 }, TerrainType.Land, 1));
terrains.push(new Terrain('ice caps', 'white', 0.99, { min: 0.45, max: 0.5 }, TerrainType.Land, 1));

if (!context) {
  throw new Error('Canvas #canvas not found');
}

const worldMap = new World(HEIGHT / tileHeight, WIDTH / tileWidth, tileWidth, tileHeight, terrains, context);

// Make the map!
clear(context);
for (let i = 0; i < 500; i++) {
  worldMap.generateMap(randRange(0, worldMap.rows - 1), randRange(0, worldMap.cols - 1));
}
worldMap.fill();

// Clears the canvas
function clear(c: CanvasRenderingContext2D) {
  c.fillStyle = 'violet';
  c.fillRect(0, 0, WIDTH, HEIGHT);
}
