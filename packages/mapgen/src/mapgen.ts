import { randRange } from './randRange';
import { World } from './World';
import { IRenderer } from './interfaces/IRenderer';

export function mapgen(renderer: IRenderer) {
  const worldMap = new World(renderer);

  renderer.clear();

  for (let i = 0; i < 500; i++) {
    worldMap.generateMap(randRange(0, worldMap.rows - 1), randRange(0, worldMap.cols - 1));
  }

  worldMap.fill();

  renderer.sync();
}
