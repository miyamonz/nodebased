import { atom } from "jotai";
import type { NodeAtom } from "../Node";
import type { Position } from "../Position";

const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());

export const setGrabAtom = atom(null, (get, set, dragTarget: NodeAtom[]) => {
  const keyValues = dragTarget.map((nodeAtom) => {
    const key = nodeAtom.toString();
    const rect = get(get(nodeAtom).rect);
    const pos = { x: rect.x, y: rect.y };
    return [key, pos] as const;
  });
  set(positionsWhenGrabbed, new Map(keyValues));
});

export const setDragDiffAtom = atom(
  null,
  (get, set, [mouseDiff, dragTarget]: [Position, NodeAtom[]]) => {
    const positions = get(positionsWhenGrabbed);

    dragTarget.forEach((nodeAtom) => {
      const startRectPos = positions.get(nodeAtom.toString());
      if (startRectPos === undefined) throw new Error();
      const moved = {
        x: startRectPos.x + mouseDiff.x,
        y: startRectPos.y + mouseDiff.y,
      };
      set(get(nodeAtom).rect, (prev) => ({ ...prev, ...moved }));
    });
  }
);
