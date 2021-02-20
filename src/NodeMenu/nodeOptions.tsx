import { SliderNode, RenderElementNode } from "../NodeList";

type OptionBase = {
  name: string;
  component?: React.FC<any>;
};
type OptionFn = OptionBase & {
  fn: (...args: any[]) => unknown;
};
export type Option = OptionFn;
export const nodeOptions: Option[] = [
  { name: "slider", fn: (x) => x, component: SliderNode },
  { name: "add", fn: (a, b) => a + b },
  { name: "sub", fn: (a, b) => a - b },
  { name: "mul", fn: (a, b) => a * b },
  { name: "div", fn: (a, b) => a / b },
  { name: "minus", fn: (a) => -a },
  { name: "clamp", fn: (a, min, max) => Math.max(min, Math.min(max, a)) },
  {
    name: "square",
    fn: (x, y, r) => <rect x={x} y={y} width={r} height={r} fill="blue" />,
  },
  { name: "render", fn: (_) => {}, component: RenderElementNode },
];
