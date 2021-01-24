import { atom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { RectProp } from "./types";

export type Position = { x: number; y: number };
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

export type Node = {
  rect: PrimitiveAtom<RectProp>;
  input: InputSocket;
  output: OutputSocket;
};
export type NodeAtom = PrimitiveAtom<Node>;

const createNodeAtom = ({ x = 0, y = 0 }): NodeAtom => {
  const rect: PrimitiveAtom<RectProp> = atom({ x, y, width: 100, height: 50 });
  const input: InputSocket = {
    type: "input",
    position: atom((get) => {
      const _rect = get(rect);
      return { x: _rect.x, y: _rect.y + _rect.height / 2 };
    }),
    atom: atom(0) as InputAtom,
    from: null,
  };
  const output: OutputSocket = {
    type: "output",
    position: atom((get) => {
      const _rect = get(rect);
      return { x: _rect.x + _rect.width, y: _rect.y + _rect.height / 2 };
    }),
    atom: atom((get) => get(input.atom)),
  };
  return atom({ rect, input, output });
};

export const nodeAtomListAtom = atom<NodeAtom[]>([]);

export const addNodeAtom = atom(null, (get, set) => {
  const nodeAtom = createNodeAtom({ x: 100, y: 20 });
  set(nodeAtomListAtom, [...get(nodeAtomListAtom), nodeAtom]);
});

const dragStartAtom = atom<{ x: number; y: number } | null>(null);

export const dragTargetAtom = atom<NodeAtom | null>(null);

function dragNode(dragTarget: Node, { get, set, pos }: any) {
  const dragStart = get(dragStartAtom);

  if (pos === "end") {
    set(dragStartAtom, null);
    set(dragTargetAtom, null);
  } else if (dragStart) {
    set(dragTarget.rect, (prev: any) => {
      return {
        ...prev,
        x: pos[0] + dragStart.x,
        y: pos[1] + dragStart.y,
      };
    });
  } else {
    const { x, y } = get(dragTarget.rect);
    set(dragStartAtom, {
      x: x - pos[0],
      y: y - pos[1],
    });
  }
}

export const connectTargetAtom = atom<OutputSocket | null>(null);
export const hoveredInputSocketAtom = atom<InputSocket | null>(null);

type Pos = readonly [number, number];
const dragDataAtom = atom<Pos | "end">("end");

export const dragAtom = atom(
  (get) => get(dragDataAtom),
  (get, set, pos: Pos | "end") => {
    set(dragDataAtom, pos);
    const dragTarget = get(dragTargetAtom);
    const connectTarget = get(connectTargetAtom);
    if (dragTarget) {
      const node = get(dragTarget);
      dragNode(node, { get, set, pos });
    }
    if (connectTarget) {
      if (pos === "end") {
        const hovered = get(hoveredInputSocketAtom);
        if (hovered) {
          console.log("connect");
          const newAtom = atom((get) => get(connectTarget.atom));
          hovered.atom = newAtom;
          hovered.from = connectTarget;
        }
        set(connectTargetAtom, null);
      }
    }
  }
);
