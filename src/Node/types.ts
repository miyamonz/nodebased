import type { RectAtom } from "../Rect";
import type { InputSocket, OutputSocket } from "../Socket";

export type NodeJSON = {
  name: string;
  position: { x: number; y: number };
  id: string;
};

export type Node = {
  rect: RectAtom;
  inputs: InputSocket<unknown>[];
  outputs: OutputSocket<unknown>[];
  name: string;
  component: NodeComponent;
  id: string;
};
export type NodeComponent = React.FC<{ node: Node }>;
