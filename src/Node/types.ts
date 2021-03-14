import type { Atom } from "jotai";
import type { RectAtom } from "../Rect";
import type { InputSocket, OutputSocket } from "../Socket";

export type NodeJSON = {
  name: string;
  position: { x: number; y: number };
  id: string;
  data?: {};
};

export type Node = {
  rect: RectAtom;
  isockets: Atom<InputSocket<unknown>[]>;
  osockets: Atom<OutputSocket<unknown>[]>;
  name: string;
  component: NodeComponent;
  id: string;
  saveData: boolean;
};
export type NodeComponent = React.FC<{ node: Node }>;
