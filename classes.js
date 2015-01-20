// Tile Class

function Tile(terrain,   // {Object} containing terrain information
               rowPos,        // {Integer} the row in the World where the tile is placed
               colPos,        // {Integer} the column in the World where the tile is placed
              World) {       // {Object} the World on which the Tile is placed
    
    // The position on the World where the Tile is placed
    // This corrosponds to an index, World[pos_x][pos_y]
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
    render : function() {
        this.c.fillStyle = this.terrain.color;
        this.c.fillRect(this.canvas_x, this.canvas_y, this.tile_width, this.tile_height);
    }
}

// World Class

function World(rows,            // {Integer} the number of rows in the world
               cols,            // {Integer} the numbers of columns in the world
               tile_width,      // {Integer} the width of each tile to display on the canvas
               tile_height,     // {Integer} the height of each tile to display on the canvas
               terrainList,     // {Array of Objects} an array of terrainTypes which determine the map
               context) {        // {Canvas Context} on which the world will be drawn
    
    this.rows = rows;
    this.cols = cols;
    this.tile_width = tile_width;
    this.tile_height = tile_height;
    this.terrainList = terrainList;
    this.c = context;
    
    // Generates a two-dimensional array for the worldMap
    this.worldMap = new Array(this.rows);
    for (var i = 0; i < this.rows; i++) {
        this.worldMap[i] = new Array(this.cols);
    }
}

World.prototype = {
    
    // Converts a colPos to the canvas coordinate x of a Tile
    colPostoCanvasX : function(colPos) {
        return colPos * this.tile_width;
    },
    
    // Converts a rowPos to the canvas coordinate y of a Tile
    rowPostoCanvasY : function(rowPos) {
        return rowPos * this.tile_height;  
    },
    
    // Converts the canvas coordinate x of a Tile to colPos
    canvasXtocolPos : function(canvasX) {
        return canvasX / this.tile_height;
    },
    
    // Converts the canvas coordinate y of a Tile to rowPos
    canvasYtorowPos : function(canvasY) {
        return canvasY / this.tile_height;   
    },
    
    // Generates a new worldmap
    generateMap : function() {
        var startCol = randRange(0, this.cols),
            startRow = randRange(0, this.rows),
            startTile = this.terrainList[randRange(0, this.terrainList.length - 1)];
        
        this.placeTiles(startRow, startCol, this.worldMap, startTile);
    },
    
    // Recursive function which first checks if a tile can be placed
    placeTiles : function(startRow, startCol, map, terrain) {
        var direction = randRange(1, 4);
        console.log(direction);
        var sdirection = direction;
        if (this.movePossible(direction, startRow, startCol)) {
            switch(direction) {
                case(1):
                    this.worldMap[startRow - 1][startCol] = new Tile(terrain, startRow - 1, startCol, this);
                    this.worldMap[startRow - 1][startCol].render();
                case(2):
                    this.worldMap[startRow][startCol + 1] = new Tile(terrain, startRow, startCol + 1, this);
                    this.worldMap[startRow][startCol + 1].render();
                case(3):
                    this.worldMap[startRow + 1][startCol] = new Tile(terrain, startRow + 1, startCol, this);
                    this.worldMap[startRow + 1][startCol].render();
                case(4):
                    this.worldMap[startRow][startCol - 1] = new Tile(terrain, startRow, startCol - 1, this);
                    this.worldMap[startRow][startCol - 1].render();
                default:
                    throw new Error("Unable to create a new tile");
            }
        }
        //choose a direction
        //if you can place a tile there, do it and render it
        //else, choose a new direction
        //if no direction can be placed, break
        //else call placeTiles again with the newly created tile's coordinates as the startx,
        // and starty with a random terrain
    },
    
    // Checks to see if a move is possible in a given direction
    movePossible : function(direction, rowPos, colPos) {
        switch (direction) {
            case(1):                // Up
                return !(this.worldMap[rowPos - 1][colPos] instanceof Tile) && (rowPos - 1 >= 0);
            case(2):
                return !(this.worldMap[rowPos][colPos + 1] instanceof Tile) && (colPos + 1 <= this.cols);
            case(3):
                return !(this.worldMap[rowPos + 1][colPos] instanceof Tile) && (rowPos + 1 <= this.rows);
            case(4):
                return !(this.worldMap[rowPos][colPos - 1] instanceof Tile) && (colPos - 1 >= 0);
            default:
                throw new Error("everthing is SNAFU");
        }
    }       
}

// Terrain Type Class

function Terrain(name, color) {
    this.name = name;
    this.color = color;
}

// FUN-CTION
// Returns a random range
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}