import { atom } from "jotai";

import { connectTargetAtom, hoveredInputSocketAtom } from "../Socket";
import type { OutputSocket } from "../Socket";
import { useEvent, Event } from "../SVGContext";

const dragAtom = atom(null, (get, set, e: Event) => {
  // connect
  const connectTarget = get(connectTargetAtom);
  if (e.type === "mouseup" && connectTarget) {
    set(dragConnectAtom, connectTarget);
  }
});
export function useMouseToConnect() {
  return useEvent(dragAtom);
}

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
