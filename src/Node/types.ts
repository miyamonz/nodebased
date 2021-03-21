import type { Atom, PrimitiveAtom } from "jotai";
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

export type Node = NodeJSON & {
  _rect: RectAtom;
  _component: NodeComponent;
  _stream: Stream;
  _toSave: Atom<unknown> | undefined;
};
export type NodeComponent = React.FC<{ node: Node }>;
