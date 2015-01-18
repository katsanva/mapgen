// Class for tile
var Tile = function(terrainName, tileColor, x, y) {
    this.name = terrainName;
    this.color = tileColor;
    
    // Set by a generator
    this.x = x;
    this.y = y;
};

// If the terrain type of the tile successfully propagates, the tile can propagate if within bounds
Tile.prototype.inBounds = function(propagationDirection) {
    switch (propagationDirection) {
        case 1:
            // Place a tile north
            return (this.x - tileHeight > 0);
        case 2:
            // Place a tile east
            return (this.y + tileWidth < WIDTH);
        case 3:
            // Place a tile south
            return (this.x + tileHeight < HEIGHT);
        case 4:
            // Place a tile west
            return (this.y - tileWidth > 0);
        default:
            console.log('Error determining valid propagation direction');
            return false;
    }
}

Tile.prototype.openSpace = function(propagationDirection, tiles, posRow, posCol) {
    switch (propagationDirection) {
        case 1:
            // Checks the north space
            return !(tiles[posRow - 1][posCol] instanceof Tile);
        case 2:
            // Checks the east space
            return !(tiles[posRow][posCol + 1] instanceof Tile);
        case 3:
            // Checks the south space
            return !(tiles[posRow + 1][posCol] instanceof Tile);
        case 4:
            // Checks the west space
            return !(tiles[posRow][posCol - 1] instanceof Tile);
        default:
            console.log('something horrible happened');
            return false;
    }
}

Tile.prototype.render = function() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, tileWidth, tileHeight);
};





// Class for terrain
var Terrain = function(name, // The name of the terrain
                        color, // the hex color
                        rarityRatio, // the rarity ratio of the tile to be randomly generated (like 2:1:1)
                        propagationRate, // the chance 1-100 it will cause the next tile to be the same type
                        latitude) { // the range from the equator that the terrain can exist at 0-50 (50 being the poles)
    this.name = name;
    this.color = color;
    this.rarityRatio = rarityRatio;
    this.propagationRate = propagationRate / 100;
    this.latitude = latitude / 100;
};

// Determines whether the terrain will propagate or not
Terrain.prototype.propagates = function() {
    var r = Math.random();
    return (Math.random() < this.propagationRate);
};