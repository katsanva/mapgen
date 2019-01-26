# `@mapgen/renderer-terminal`

Render created map to terminal.

## Usage

As far terminal has only 256 colors a basic color mapping is performed via [color difference calculation](https://en.wikipedia.org/wiki/Color_difference):

- Euclidean

```ts
import { mapgen } from '@mapgen/mapgen';
import { TerminalRenderer } from '@mapgen/renderer-terminal';
import { terminal } from 'terminal-kit';

const renderer = new TerminalRenderer(terminal);

mapgen(renderer);
```

- CIEDE2000

```ts
import { mapgen } from '@mapgen/mapgen';
import { TerminalRenderer, CIEDE2000ColorResolver } from '@mapgen/renderer-terminal';
import { terminal } from 'terminal-kit';

const renderer = new TerminalRenderer(terminal, new CIEDE2000ColorResolver());

mapgen(renderer);

```

## Result

![Rendered ro console](/images/terminal.png)
