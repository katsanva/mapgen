# `@mapgen/mapgen`

Generate random pixel map.

## Usage

```ts
import { mapgen } from '@mapgen/mapgen';
import { TerminalRenderer } from '@mapgen/renderer-terminal';
import { terminal } from 'terminal-kit';

const renderer = new TerminalRenderer(terminal);

mapgen(renderer);
```

## Result

View in [terminal](/packages/renderer-terminal):

![Rendered ro console](/images/terminal.png)

View in [canvas](/packages/renderer-canvas):

![Rendered to canvas](/images/canvas.png)
