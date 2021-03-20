import type { Atom } from "jotai";
import type { RectAtom } from "../Rect";
import type { InputSocket, OutputSocket } from "../Socket";
import type { Stream } from "../Stream";

import type { InputSocketJSON, OutputSocketJSON } from "../Socket/types";

export type NodeJSON = {
  name: string;
  position: { x: number; y: number };
  id: string;
  isockets: InputSocketJSON[];
  osockets: OutputSocketJSON[];
  data?: {};
};

export type Node = {
  rect: RectAtom;
  isockets: Atom<InputSocket<unknown>[]>;
  osockets: Atom<OutputSocket<unknown>[]>;
  name: string;
  component: NodeComponent;
  id: string;
  stream: Stream;
  toSave: Atom<unknown> | undefined;
};
export type NodeComponent = React.FC<{ node: Node }>;
