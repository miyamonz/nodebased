import { atom, Atom } from "jotai";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeStream } from "./streams";

import type { Position } from "../Position";
import type { RectAtom } from "../Rect";

const defaultSizeAtom = atom(
  (get) =>
    get(get(defaultNodeSizeStream.outputMap).get(0) as any) as {
      width: number;
      height: number;
    }
);

export function createRect(
  position: Position,
  socketNum: number,
  innerSize: Atom<{ width: number; height: number }> | undefined
): RectAtom {
  const rectPos = atom(position);

  const sizeAtom = atom((get) => {
    const s = get(defaultSizeAtom);
    const i = innerSize ? get(innerSize) : { width: 0, height: 0 };
    const offset = 20;
    return {
      width:
        Math.max(s.width, i.width) + (innerSize !== undefined ? offset : 0),
      height:
        Math.max(s.height, (socketNum + 1) * 25) +
        i.height +
        (innerSize !== undefined ? offset : 0),
    };
  });
  const rect = createRectAtom(rectPos, sizeAtom);
  return rect;
}
