import { mapgen } from '@mapgen/mapgen';
import { StreamRenderer } from './StreamRenderer';
import { createWriteStream } from 'fs';

const stream = createWriteStream('./stream.png');

const renderer = new StreamRenderer(stream, 1, 1, 640, 480);

mapgen(renderer);
