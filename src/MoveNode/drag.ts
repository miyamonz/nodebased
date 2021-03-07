import { atom } from "jotai";
import type { Node } from "../Node";
import type { Position } from "../Position";

const positionsWhenGrabbed = atom<Map<string, Position>>(new Map());

export const setGrabAtom = atom(null, (get, set, dragTarget: Node[]) => {
  const keyValues = dragTarget.map((node) => {
    const key = node.id;
    const rect = get(node.rect);
    const pos = { x: rect.x, y: rect.y };
    return [key, pos] as const;
  });
  set(positionsWhenGrabbed, new Map(keyValues));
});

export const setDragDiffAtom = atom(
  null,
  (get, set, [mouseDiff, dragTarget]: [Position, Node[]]) => {
    const positions = get(positionsWhenGrabbed);

    dragTarget.forEach((node) => {
      const startRectPos = positions.get(node.id);
      if (startRectPos === undefined) throw new Error();
      const moved = {
        x: startRectPos.x + mouseDiff.x,
        y: startRectPos.y + mouseDiff.y,
      };
      set(node.rect, (prev) => ({ ...prev, ...moved }));
    });
  }
);
