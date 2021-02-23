import { atom, useAtom } from "jotai";

import type { InputSocket, OutputSocket } from "../Socket";
import type { SimpleMouseEvent } from "../Mouse";

export const connectTargetAtom = atom<OutputSocket<unknown> | null>(null);
export function useConnectTarget() {
  const [connectTarget] = useAtom(connectTargetAtom);
  return connectTarget;
}
export function useSetConnectFrom() {
  const [, setConnectTarget] = useAtom(connectTargetAtom);
  return setConnectTarget;
}

const hoveredInputSocketAtom = atom<InputSocket<unknown> | null>(null);
export function useHoveredInputSocket() {
  return useAtom(hoveredInputSocketAtom);
}

export const dragAtomToConnect = atom(null, (get, set, e: SimpleMouseEvent) => {
  // connect
  const connectTarget = get(connectTargetAtom);
  if (e.type === "up" && connectTarget) {
    set(dragConnectAtom, connectTarget);
  }
});

const dragConnectAtom = atom(
  null,
  (get, set, connectTarget: OutputSocket<unknown>) => {
    const hovered = get(hoveredInputSocketAtom);
    if (hovered) {
      console.log("connect", connectTarget, hovered);
      const newAtom = atom((get) => get(connectTarget.atom));
      hovered.from = connectTarget;
      // set new atom that will return target atom's value into hovered inputSocket
      set(hovered.atom, newAtom);
    }
    set(connectTargetAtom, null);
  }
);
