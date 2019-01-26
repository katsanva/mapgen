import { IRGBColor } from './IRGBColor';

export interface ITerminalColor {
  colorId: number;
  hexString: string;
  rgb: IRGBColor;
  hsl: { h: number; s: number; l: number };
  name: string;
}
