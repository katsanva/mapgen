// Functions

// Clears the canvas
function clear() {
    c.fillStyle = "#FFFFFF";
    c.fillRect(0, 0, WIDTH, HEIGHT);
}

// Returns a random range
function randRange(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// Select the next tile to generate if no previous tiles propagated
function selectTile(tileset) {
    var choices = [];
    tileset.forEach( function(element, index) {
        for (var i = 0; i < element.rarityRatio; i++) {
            choices.push(element.name);
        }
    });
    var choice = randRange(0, choices.length - 1);
    return choices[choice];
}


// Sets up the canvas
var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d"),
    HEIGHT = canvas.height,
    WIDTH = canvas.width,
    tileHeight = 10,
    tileWidth = 10;

// Available Tiles
var tileset = [];
tileset.push(new Terrain("water", "#0000FF", 2, 60, 50));
tileset.push(new Terrain("mountains", "#364411", 1, 40, 50));
tileset.push(new Terrain("forest", "#33FF44", 1, 80, 50));

// Tiles on the map
var tiles = [];

// Generates a two-dimensional array 
for (var i = 0, len = WIDTH / tileWidth; i < len; i++) {
    var arr = [];
    for (var j = 0, len = HEIGHT / tileHeight; j < len; j++) {
        arr.push(j);   
    }
    tiles.push(arr);
}

// Returns true if a move is possible, false if a move is not possible
function canMoveToNewDirection(newDirection, row, col) {
    var start = newDirection,
    canMoveThere = false,
    impossibleMove = false;
    // If that direction is taken, check all other directions in order
    while (!canMoveThere && !impossibleMove) {
        // First, check the basic bounds
        if (tiles[row][col].inBounds(newDirection)) {
            if (tiles[row][col].openSpace(newDirection, tiles, row, col)) {
                canMoveThere = true;  
            }
        } else {
            console.log("cannot move " + newDirection);
            newDirection = (newDirection % 4) + 1;
            if (newDirection === start) {
                impossibleMove = true;
            }
        }
    }
    if (impossibleMove) {
        return false;
    } else {
        return true;
    }
}

// Builds a Tile of type startingTerrain at tileset[row][col]
    // and then determines the location and terrain of the next tile to create
function nextTile(startingTerrain, row, col) {
    
    var tile = startingTerrain,
        terrainTileIndex,
        x= row * tileWidth,
        y = col * tileHeight;
    
    // Iterate of the tiles to find a match to the name
    tileset.forEach( function(element, i) {
        if (element.name === tile) {
            // Create a new Tile
            tile = new Tile(tileset[i].name, tileset[i].color, x, y);
            // Draw the tile -- THIS SHOULD BE MOVED TO ITS OWN RENDER(TILES) FUNCTION LATER --
            tile.render();
            // Index the new tile in the array of tiles
            tiles[row][col] = tile;
            // Save the index of where it is in the tileset[]
            tileTerrainIndex = i;
            return;
        }
    });
    
    // Choose a direction to go
    var newDirection = randRange(1, 4); // 1 = north, 2 = east, 3 = south, 4 = west
    if (canMoveToNewDirection(newDirection, row, col)) {
         switch (newDirection) {
            case 1:
                // Chance in direction north
                row = row - 1;
                break;
            case 2:
                // Chance in direction east
                col = col + 1;
                break;
            case 3:
                // Change in direction south
                row = row + 1;
                break;
            case 4:
                // Change in direction west
                col = col - 1;
                break;
            default:
                console.log('ya dun fucked up, son');
                break;
        }
        
        // Check to see if this tile propagates
        if (tileset[tileTerrainIndex].propagates()) {
            // Recursive call using propagated tile
            console.log ("new recursive call with starting terrain" + startingTerrain + "at x:" + x + "y: " + y);
           // nextTile(startingTerrain, row, col);
        } else {
            // Else, select a new tile and call
            startingTerrain = selectTile(tileset);
            console.log ("new recursive call with starting terrain" + startingTerrain + "at x:" + x + "y: " + y);
           // nextTile(startingTerrain, row, col);
        }
        
    // If canMoveToNewDirection === false, end generation
    } else {
        console.log('furthur tile generation is not possible');
        return;
    }
}

// Seeds and generates the map
function seedMap(startingTerrain, row, col) {

    nextTile(startingTerrain, row, col);
    
}

// Make the map!
clear();

// Test cases
tiles[3][3] = new Tile("mountain", "red", 3, 3);
tiles[3][3].render();

tiles[3][4] = new Tile("mountain", "coral", 3, 4);
tiles[3][4].render();

tiles[2][3] = new Tile("river", "darkblue", 2, 3);
tiles[2][3].render();