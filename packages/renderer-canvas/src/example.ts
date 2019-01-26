import { CanvasRenderer } from './CanvasRenderer';
import { mapgen } from '@mapgen/mapgen';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);

mapgen(renderer);
