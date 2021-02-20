import { SliderNode } from "../Node/SliderNode";
import { RenderElementNode } from "../Node/RenderElementNode";

export type Option = {
  name: string;
  fn?: (...args: any[]) => any;
  component?: React.FC<any>;
};
export const nodeOptions: Option[] = [
  { name: "slider", component: SliderNode },
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
