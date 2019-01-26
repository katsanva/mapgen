# `@mapgen/renderer-terminal`

Render created map to terminal.

## Usage

```ts
import { mapgen } from '@mapgen/mapgen';
import { TerminalRenderer } from '@mapgen/renderer-terminal';
import { terminal } from 'terminal-kit';

const renderer = new TerminalRenderer(terminal);

mapgen(renderer);
```

## Result

![Rendered ro console](/images/terminal.png)
