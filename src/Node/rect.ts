import { atom, Atom } from "jotai";

import { createRectAtom } from "../Rect";
import { defaultNodeSizeStream } from "./streams";

import type { Position } from "../Position";
import type { Rect } from "../Rect";

const sizeAtom = atom(
  (get) =>
    get(get(defaultNodeSizeStream.outputMap).get(0) as any) as {
      width: number;
      height: number;
    }
);

export function createRect(
  position: Position,
  innerSize: Atom<Rect> | undefined
) {
  const rectPos = atom(position);
  const rect = createRectAtom(rectPos, sizeAtom);
  if (!innerSize) return rect;

  return atom((get) => {
    const r = get(rect);
    const i = get(innerSize);
    return { ...r, width: r.width + i.width, height: r.height + i.height };
  });
}
