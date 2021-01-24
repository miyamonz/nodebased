import { atom } from "jotai";

import type { Atom, PrimitiveAtom } from "jotai";
import type { Position, RectProp } from "../types";

export type PositionAtom = Atom<Position>;

type Socket = {
  position: PositionAtom;
};
export type InputSocket = Socket & {
  type: "input";
  atom: InputAtom;
  from: OutputSocket | null;
};
export type OutputSocket = Socket & {
  type: "output";
  atom: OutputAtom;
};

export type InputAtom = PrimitiveAtom<number> | Atom<number>;
export type OutputAtom = Atom<number>;

export type RectAtom = PrimitiveAtom<RectProp>;

export type Node = {
  rect: RectAtom;
  input: InputSocket;
  output: OutputSocket;
};
export type NodeAtom = PrimitiveAtom<Node>;

const createInputSocket = (rectAtom: RectAtom): InputSocket => {
  return {
    type: "input",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x, y: rect.y + rect.height / 2 };
    }),
    atom: atom(0) as InputAtom,
    from: null,
  };
};

const createOutputSocket = (
  rectAtom: RectAtom,
  inputAtom: InputAtom
): OutputSocket => {
  return {
    type: "output",
    position: atom((get) => {
      const rect = get(rectAtom);
      return { x: rect.x + rect.width, y: rect.y + rect.height / 2 };
    }),
    atom: atom((get) => get(inputAtom)),
  };
};

export const createNodeAtom = ({ x = 0, y = 0 }): NodeAtom => {
  const rect: PrimitiveAtom<RectProp> = atom({ x, y, width: 100, height: 50 });
  const input = createInputSocket(rect);
  const output = createOutputSocket(rect, input.atom);
  return atom({ rect, input, output });
};
