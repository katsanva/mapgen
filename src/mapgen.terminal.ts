import { mapgen } from './mapgen';
import { TerminalRenderer } from './TerminalRenderer';
import { terminal } from 'terminal-kit';

const renderer = new TerminalRenderer(terminal);

mapgen(renderer);
