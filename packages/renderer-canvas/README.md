# `@mapgen/renderer-canvas`

> TODO: description

## Usage

```ts
import { CanvasRenderer } from '@mapgen/renderer-canvas';
import { mapgen } from '@mapgen/mapgen';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);

mapgen(renderer);
```
