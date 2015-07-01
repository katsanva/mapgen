// Terrain Type Class

function Terrain(name, // {String} the name of the terrain
  color, // {String} The base color of the terrain
  propagationRate, // {Number} The chance 0-1 that the tile will propagate
  latitudeThreshold, // {Object} The range (min / max) 0-0.5 of variance from the equator that the terrain can exist
  type, // {String} land, water
  typeBindStrength) { // {Number} The chance 0-1 that the next block will be of the same type
  this.name = name;
  this.color = color;
  this.propagationRate = propagationRate;
  this.latitudeThreshold = {};
  if (latitudeThreshold.min) {
    this.latitudeThreshold.min = latitudeThreshold.min;
  } else {
    this.latitudeThreshold.min = 0;
  }
  this.latitudeThreshold.max = latitudeThreshold.max;
  this.type = type;
  this.typeBindStrength = typeBindStrength;
  // Todo, propigation rates, latitudes, climates, wildlife, different shapes, gradients, and colors
}

Terrain.prototype = {
	// Determines whether the tile propagates
	propagates : function(currentLatitude) {
		if (currentLatitude < this.latitudeThreshold.min ||
      currentLatitude > this.latitudeThreshold.max) {
			return false;
		}
		return (this.propagationRate > Math.random());
	},

  // Determines whether the type holds
  typeStaysSame : function () {
    if (this.typeBindStrength > Math.random()) {
      return true;
    }
    return false;
  }
};