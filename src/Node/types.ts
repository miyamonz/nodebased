import type { RectAtom } from "../Rect";
import type { InputSocket, OutputSocket } from "../Socket";

export type Node = {
  rect: RectAtom;
  inputs: InputSocket<unknown>[];
  outputs: OutputSocket<unknown>[];
  name: string;
  component: NodeComponent;
  id: string;
};
export type NodeComponent = React.FC<{ node: Node }>;
