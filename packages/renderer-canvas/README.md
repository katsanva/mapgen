# `@mapgen/renderer-canvas`

Render generated map to terminal

## Usage

```ts
import { CanvasRenderer } from '@mapgen/renderer-canvas';
import { mapgen } from '@mapgen/mapgen';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);

mapgen(renderer);
```

## Result

![Rendered to canvas](/images/canvas.png)