// Terrain Type Class

export class Terrain{
  public latitudeThreshold: Treshold;

  /**
   * Terrain Type Class
   * @param name {String} the name of the terrain
   * @param color {String} The base color of the terrain
   * @param propagationRate {Number} The chance 0-1 that the tile will propagate
   * @param latitudeThreshold {Object} The range (min / max) 0-0.5 of variance from the equator that the terrain can exist
   * @param type {String} land, water
   * @param typeBindStrength {Number} The chance 0-1 that the next block will be of the same type
   */
  constructor(public name: string,
  public color: string, 
  public propagationRate: number, 
   {min = 0, max}: MaxTreshold, 
  public type: 'land' | 'water', 
  public typeBindStrength: number) { 
    this.latitudeThreshold = {min, max};
  
  // Todo, propigation rates, latitudes, climates, wildlife, different shapes, gradients, and colors
}
	// Determines whether the tile propagates
	propagates(currentLatitude: number) {
		if (currentLatitude < this.latitudeThreshold.min ||
      currentLatitude > this.latitudeThreshold.max) {
			return false;
		}
		return (this.propagationRate > Math.random());
	}

  // Determines whether the type holds
  typeStaysSame () {
    if (this.typeBindStrength > Math.random()) {
      return true;
    }
    return false;
  }
};
 
type Treshold = {min: number, max: number}
type MaxTreshold = {min?: number, max: number}