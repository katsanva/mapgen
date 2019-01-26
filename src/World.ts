import { Tile } from './Tile';
import { Terrain } from './Terrain';
import { randRange } from './randRange';
import { TerrainType } from './TerrainType.enum';
import { IRenderer } from './interfaces/IRenderer';
import { terrainList } from './Terrains';

enum Direction {
  Up = 1,
  Right,
  Down,
  Left,
}

export class World {
  public height: number;
  public width: number;
  public rows: number;
  public cols: number;

  private worldMap: Tile[][];
  private typeLand: Terrain[];
  private typeWater: Terrain[];

  // The remaining calls for the generateMap() function
  private callsRemaining = 0;

  /**
   * World Class
   * @param rows {Integer} the number of rows in the world
   * @param cols  {Integer} the numbers of columns in the world
   * @param width {Integer} the width of each tile to display on the canvas
   * @param height {Integer} the height of each tile to display on the canvas
   * @param terrainList {Array of Objects} an array of terrainTypes which determine the map
   * @param renderer {IRenderer} on which the world will be drawn
   */
  constructor(public renderer: IRenderer) {
    this.rows = renderer.height / renderer.tileHeight;
    this.cols = renderer.width / renderer.tileWidth;
    this.height = renderer.tileHeight;
    this.width = renderer.tileWidth;

    // Generates a two-dimensional array for the worldMap
    this.worldMap = new Array(this.rows);

    for (let i = 0; i < this.rows; i++) {
      this.worldMap[i] = new Array(this.cols);
    }

    // Generates the terrain types lists;
    this.typeLand = [];
    this.typeWater = [];

    for (const i in terrainList) {
      if (terrainList[i].type === TerrainType.Land) {
        this.typeLand.push(terrainList[i]);
      } else {
        this.typeWater.push(terrainList[i]);
      }
    }
  }

  // Converts a colPos to the canvas coordinate x of a Tile
  public colPostoCanvasX(colPos: number) {
    return colPos * this.width;
  }

  // Converts a rowPos to the canvas coordinate y of a Tile
  public rowPostoCanvasY(rowPos: number) {
    return rowPos * this.height;
  }

  // Converts the canvas coordinate x of a Tile to colPos
  public canvasXtocolPos(canvasX: number) {
    return canvasX / this.height;
  }

  // Converts the canvas coordinate y of a Tile to rowPos
  public canvasYtorowPos(canvasY: number) {
    return canvasY / this.height;
  }

  // Checks to see if the map is full
  public fill() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.generateMap(i, j);
      }
    }
  }

  // Generates a new worldmap
  public generateMap(startRow: number, startCol: number) {
    // Check if there's already a Tile there
    if (this.worldMap[startRow][startCol] instanceof Tile) {
      return;
    }

    this.callsRemaining = 1000;
    const currentLatitude = this.currentLatitude(startRow);
    const startTile = this.chooseAnyTile(currentLatitude);

    this.placeTiles(startRow, startCol, this.worldMap, startTile);
  }

  // Recursive function which first checks if a tile can be placed
  private placeTiles(startRow: number, startCol: number, map: any, terrain: Terrain) {
    // Lower the remaining calls available
    this.callsRemaining--;
    // Find the current latitude
    const currentLatitude = this.currentLatitude(startRow);
    // First, place a tile -- you've only gotten to this point if you can place one
    const tile = new Tile(terrain, startRow, startCol, this);
    this.worldMap[startRow][startCol] = tile;
    // Render the tile onto the map
    this.renderer.render(tile);
    // Propagate the terrain or choose a new one
    const nextTerrain = this.chooseNextTerrain(currentLatitude, terrain);
    // Choose a new starting direction
    let direction = randRange(1, 4);
    const sdirection = direction; // set the stop direction

    // The recursive part that calls placeTiles again in the new direction
    do {
      if (this.movePossible(direction, startRow, startCol)) {
        switch (direction) {
          case Direction.Up:
            this.placeTiles(startRow - 1, startCol, this.worldMap, nextTerrain);
            break;
          case Direction.Right:
            this.placeTiles(startRow, startCol + 1, this.worldMap, nextTerrain);
            break;
          case Direction.Down:
            this.placeTiles(startRow + 1, startCol, this.worldMap, nextTerrain);
            break;
          case Direction.Left:
            this.placeTiles(startRow, startCol - 1, this.worldMap, nextTerrain);
            break;
          default:
            throw new Error('Unable to create a new tile!');
        }
      }

      direction++;

      if (direction > 4) {
        direction %= 4;
      }
      // when direction reaches the stop direction, stop attempting to create tiles
    } while (direction !== sdirection && this.callsRemaining > 0);
  }

  // Chooses the next Tile to make
  private chooseNextTerrain(currentLatitude: number, terrain: Terrain) {
    let nextTerrain;
    if (terrain.propagates(currentLatitude)) {
      nextTerrain = terrain;
    } else {
      if (terrain.typeStaysSame()) {
        if (terrain.type === TerrainType.Land) {
          nextTerrain = this.typeLand[randRange(0, this.typeLand.length - 1)];
        } else {
          nextTerrain = this.typeWater[randRange(0, this.typeWater.length - 1)];
        }
      } else {
        do {
          nextTerrain = terrainList[randRange(0, terrainList.length - 1)];
        } while (
          currentLatitude < nextTerrain.latitudeThreshold.min ||
          currentLatitude > nextTerrain.latitudeThreshold.max
        );
      }
    }
    return nextTerrain;
  }

  // Checks to see if a move is possible in a given direction
  private movePossible(direction: Direction, rowPos: number, colPos: number) {
    switch (direction) {
      // First, check the rectangular bounds of the map, then check if there's already a tile in place
      case Direction.Up: // Up
        return rowPos - 1 >= 0 && !(this.worldMap[rowPos - 1][colPos] instanceof Tile);
      case Direction.Right: // Right
        return colPos + 1 <= this.cols - 1 && !(this.worldMap[rowPos][colPos + 1] instanceof Tile);
      case Direction.Down: // Down
        return rowPos + 1 <= this.rows - 1 && !(this.worldMap[rowPos + 1][colPos] instanceof Tile);
      case Direction.Left: // Left
        return colPos - 1 >= 0 && !(this.worldMap[rowPos][colPos - 1] instanceof Tile);
      default:
        throw new Error('Everything is SNAFU');
    }
  }

  // Chooses any viable tile
  private chooseAnyTile(currentLatitude: number) {
    let tile;
    do {
      tile = terrainList[randRange(0, terrainList.length - 1)];
    } while (currentLatitude < tile.latitudeThreshold.min || currentLatitude > tile.latitudeThreshold.max);
    return tile;
  }

  // Finds the current latitude based off the given row in the range 0-1 as the threshold from the equator
  // Only at the equator is a 0 and everywhere on the map is a 0.5 (+- 0.5 from the equator)
  private currentLatitude(rowPos: number) {
    const latitude = rowPos / this.rows;
    return latitude < 0.5 ? 0.5 - latitude : latitude - 0.5;
  }
}
