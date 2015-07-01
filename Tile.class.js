// Tile Class

function Tile(terrain, // {Object} containing terrain information
  rowPos, // {Integer} the row in the World where the tile is placed
  colPos, // {Integer} the column in the World where the tile is placed
  World) { // {Object} the World on which the Tile is placed (needed for the drawing context)

  // The position on the World where the Tile is placed
  // This corrosponds to an index, World[row][col]
  this.rowPos = rowPos;
  this.colPos = colPos;

  // The position on the canvas where the Tile is placed
  this.canvas_x = World.colPostoCanvasX(colPos);
  this.canvas_y = World.rowPostoCanvasY(rowPos);

  // The size of the tile on the canvas
  this.tile_width = World.tile_width;
  this.tile_height = World.tile_height;

  // The Terrain of the Tile
  this.terrain = terrain;

  // The canvas
  this.c = World.c;
}

Tile.prototype = {

  // Renders the tile on the canvas
  render: function() {
    this.c.fillStyle = this.terrain.color;
    this.c.fillRect(this.canvas_x, this.canvas_y, this.tile_width, this.tile_height);
  }

};