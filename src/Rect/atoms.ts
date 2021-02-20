import { atom } from "jotai";
import type { Atom, PrimitiveAtom } from "jotai";
import type { RectAtom } from "./types";
import type { Position } from "../types";

export function createRectAtom(
  posAtom: PrimitiveAtom<Position>,
  defaultSizeAtom: Atom<{ width: number; height: number }>
): RectAtom {
  const rect = atom(
    (get) => {
      const defaultSize = get(defaultSizeAtom);
      const position = get(posAtom);
      return {
        ...position,
        ...defaultSize,
      };
    },
    (get, set, action) => {
      const newRect = typeof action === "function" ? action(get(rect)) : action;
      set(posAtom, { x: newRect.x, y: newRect.y });
    }
  );
  return rect;
}
